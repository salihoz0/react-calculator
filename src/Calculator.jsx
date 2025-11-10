import React, { useEffect, useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import HistoryIcon from '@mui/icons-material/History';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

const BUTTONS = [
    ['C', '⌫', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
];

const OPERATORS = ['+', '-', '×', '÷', '*', '/'];

// Detailed default style schema for `styleOverrides` prop.
// Users can pass `styleOverrides` as either a flat sx object (applies to Paper)
// or as a nested object with named sections below. Example:
// {
//   paper: { /* Paper sx */ },
//   titleBar: { /* sx for title bar Box */ },
//   button: { /* general button sx */ },
//   buttonByKey: { '=': { bgcolor: 'red' } },
//   display: { /* TextField sx */ },
//   history: { /* history list container sx */ },
//   historyTitle: { /* sx for history title Typography */ },
//   modal: { /* sx for modal inner Box */ }
// }
const DEFAULT_STYLE_OVERRIDES = {
    paper: {},
    titleBar: {},
    button: {},
    buttonByKey: {},
    display: {},
    history: {},
    historyTitle: {},
    modal: {},
};

function safeEvaluate(expr) {
    try {
        const cleaned = String(expr).replace(/×/g, '*').replace(/÷/g, '/');
        if (/[^0-9+\-*/(). %]/.test(cleaned)) return 'Error';
        // eslint-disable-next-line no-new-func
        const result = Function('"use strict"; return (' + cleaned + ')')();
        if (result === Infinity || Number.isNaN(result)) return 'Error';
        return String(result);
    } catch (err) {
        return 'Error';
    }
}

const STORAGE_KEY_HISTORY = 'calculator_history';
const STORAGE_KEY_POSITION = 'calculator_position';
const STORAGE_KEY_STATE = 'calculator_minimized_state';

function getStoredHistory() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(-20)));
    } catch {
        // ignore
    }
}

function getStoredPosition() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_POSITION);
        return stored ? JSON.parse(stored) : { x: 50, y: 50 };
    } catch {
        return { x: 50, y: 50 };
    }
}

function savePosition(pos) {
    try {
        localStorage.setItem(STORAGE_KEY_POSITION, JSON.stringify(pos));
    } catch {
        // ignore
    }
}

function getMinimizedState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_STATE);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function isOperator(ch) {
    return ch === '+' || ch === '-' || ch === '×' || ch === '÷' || ch === '*' || ch === '/';
}

function toDisplayOperator(ch) {
    if (ch === '*') return '×';
    if (ch === '/') return '÷';
    return ch;
}

function toEvalExpression(display) {
    return String(display).replace(/×/g, '*').replace(/÷/g, '/');
}

function canAppendDot(display) {
    // Find last operator position and check current token after it
    const lastOpIndex = Math.max(
        display.lastIndexOf('+'),
        display.lastIndexOf('-'),
        display.lastIndexOf('×'),
        display.lastIndexOf('÷'),
        display.lastIndexOf('*'),
        display.lastIndexOf('/')
    );
    const token = lastOpIndex === -1 ? display : display.slice(lastOpIndex + 1);
    return token.indexOf('.') === -1;
}

function sanitizeExpression(expr) {
    let sanitized = '';
    for (let ch of expr) {
        if (ch === '*') ch = '×';
        if (ch === '/') ch = '÷';
        if (/\d/.test(ch) || ch === '.' || isOperator(ch) || ch === '(' || ch === ')') {
            sanitized += ch;
        }
    }
    return sanitized;
}

function saveMinimizedState(state) {
    try {
        localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
    } catch {
        // ignore
    }
}

function clearMinimizedState() {
    try {
        localStorage.removeItem(STORAGE_KEY_STATE);
    } catch {
        // ignore
    }
}

/**
 * Calculator component with various modes.
 *
 * @param {("embedded"|"floating"|"modal")} mode - Either 'embedded', 'floating', or 'modal'.
 * @param {string} title - The title of the calculator.
 * @param {string} historyTitle - The title of the history list.
 * @param {boolean} initiallyOpen - Whether to open the calculator on mount.
 * @param {string} initialValue - The initial display value of the calculator.
 * @param {function} onChange - Called when the display value changes.
 * @param {function} onOpen - Called when the calculator is opened.
 * @param {function} onClose - Called when the calculator is closed.
 * @param {function} setOpen - Called when the calculator's open state is toggled.
 * @param {number} width - The width of the calculator.
 * @param {number} height - The height of the calculator.
 * @param {object} styleOverrides - Optional style overrides for the calculator.
 */
export default function Calculator({
    mode = 'embedded',
    title = 'Calculator',
    historyTitle = 'Calculation History',
    initiallyOpen = false,
    initialValue = '',
    onChange,
    onOpen,
    onClose,
    setOpen: externalSetOpen,
    width = 380,
    height = 500,
    // styleOverrides accepts either a flat sx object (applies to Paper)
    // or a nested object matching DEFAULT_STYLE_OVERRIDES.
    styleOverrides = {},
}) {
    const [internalOpen, setInternalOpen] = useState(mode === 'embedded' ? true : initiallyOpen);
    const open = externalSetOpen ? (mode === 'embedded' ? true : initiallyOpen) : internalOpen;
    const setOpen = externalSetOpen || setInternalOpen;
    const [display, setDisplay] = useState(String(initialValue || ''));
    const [history, setHistory] = useState(getStoredHistory);
    const [showHistory, setShowHistory] = useState(false);
    const [activeKey, setActiveKey] = useState(null);
    const rootRef = useRef(null);
    const dragRef = useRef({ dragging: false, x: 0, y: 0 });
    const [pos, setPos] = useState(getStoredPosition);

    // resolve styleOverrides once per render so modal and inner render can share it
    const _nested =
        typeof styleOverrides === 'object' &&
        (styleOverrides.paper || styleOverrides.button || styleOverrides.display);
    const _resolved = _nested
        ? { ...DEFAULT_STYLE_OVERRIDES, ...styleOverrides }
        : { ...DEFAULT_STYLE_OVERRIDES, paper: styleOverrides };
    const paperOverrides = _resolved.paper || {};
    const titleBarOverrides = _resolved.titleBar || {};
    const buttonOverrides = _resolved.button || {};
    const buttonByKey = _resolved.buttonByKey || {};
    const displayOverrides = _resolved.display || {};
    const historyOverrides = _resolved.history || {};
    const historyTitleOverrides = _resolved.historyTitle || {};
    const modalOverrides = _resolved.modal || {};

    // On mount, check if there's a minimized state to restore
    useEffect(() => {
        if (mode === 'floating') {
            const minimizedState = getMinimizedState();
            if (minimizedState && initiallyOpen) {
                setDisplay(minimizedState.display);
                setHistory(minimizedState.history);
                clearMinimizedState();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = useCallback(onChange, [onChange]);
    const handleOnOpen = useCallback(onOpen, [onOpen]);
    const handleOnClose = useCallback(onClose, [onClose]);

    useEffect(() => {
        if (typeof handleOnChange === 'function') handleOnChange(display);
    }, [display, handleOnChange]);

    useEffect(() => {
        if (open && typeof handleOnOpen === 'function') handleOnOpen();
        if (!open && typeof handleOnClose === 'function') handleOnClose();
    }, [open, handleOnOpen, handleOnClose]);

    // Save position when it changes
    useEffect(() => {
        if (mode === 'floating') {
            savePosition(pos);
        }
    }, [pos, mode]);

    const handleClear = useCallback(() => {
        setDisplay('');
    }, []);

    const handleBackspace = useCallback(() => {
        setDisplay((d) => {
            const next = d.length <= 1 ? '' : d.slice(0, -1);
            return next;
        });
    }, []);

    const handleEquals = useCallback(() => {
        setDisplay((d) => {
            if (!d || d === 'Error') return d;
            const sanitized = sanitizeExpression(d);
            if (!sanitized) return d;
            const exprForEval = toEvalExpression(sanitized);
            const result = safeEvaluate(exprForEval);
            if (result !== 'Error') {
                const newEntry = { expression: sanitized, result, timestamp: Date.now() };
                setHistory((h) => {
                    const newHistory = [...h, newEntry];
                    saveHistory(newHistory);
                    return newHistory;
                });
            }
            return result;
        });
    }, []);

    useEffect(() => {
        let keyClearTimer = null;
        function onKeyDown(e) {
            if (!open || showHistory) return;
            const rawKey = e.key;
            const key =
                rawKey === '*'
                    ? '×'
                    : rawKey === '/'
                    ? '÷'
                    : rawKey === 'Enter'
                    ? '='
                    : rawKey === 'Backspace'
                    ? '⌫'
                    : rawKey;

            setActiveKey(key);
            if (keyClearTimer) clearTimeout(keyClearTimer);
            keyClearTimer = setTimeout(() => setActiveKey(null), 140);

            if (/^[0-9.+\-×÷()]$/.test(key)) {
                setDisplay((d) => {
                    if (d === 'Error') return key;
                    if (key === '.') {
                        return canAppendDot(d) ? (d === '' ? '0.' : d + '.') : d;
                    }
                    if (isOperator(key)) {
                        if (d === '') return key === '-' ? '-' : d;
                        const last = d.slice(-1);
                        if (isOperator(last)) return d.slice(0, -1) + key;
                        return d + key;
                    }
                    if (key === '(' || key === ')') return d + key;
                    return d === '0' ? key : d + key;
                });
                e.preventDefault();
            } else if (e.key === 'Enter' || e.key === '=') {
                setActiveKey('=');
                if (keyClearTimer) clearTimeout(keyClearTimer);
                keyClearTimer = setTimeout(() => setActiveKey(null), 140);
                handleEquals();
                e.preventDefault();
            } else if (e.key === 'Backspace') {
                setActiveKey('⌫');
                if (keyClearTimer) clearTimeout(keyClearTimer);
                keyClearTimer = setTimeout(() => setActiveKey(null), 140);
                handleBackspace();
                e.preventDefault();
            } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
                setActiveKey(e.key.toLowerCase() === 'c' ? 'C' : 'C');
                if (keyClearTimer) clearTimeout(keyClearTimer);
                keyClearTimer = setTimeout(() => setActiveKey(null), 140);
                handleClear();
                e.preventDefault();
            } else {
                // Prevent default for any other keys to avoid typing invalid characters
                e.preventDefault();
            }
        }

        function onKeyUp() {
            if (keyClearTimer) clearTimeout(keyClearTimer);
            setActiveKey(null);
        }

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            if (keyClearTimer) clearTimeout(keyClearTimer);
        };
    }, [open, showHistory, handleEquals, handleBackspace, handleClear]);

    function onMouseDownDrag(e) {
        // Only drag from the title bar area
        if (e.target.closest('.calc-drag-handle')) {
            dragRef.current = { dragging: true, x: e.clientX, y: e.clientY };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        }
    }

    function onMouseMove(e) {
        if (!dragRef.current.dragging) return;
        const dx = e.clientX - dragRef.current.x;
        const dy = e.clientY - dragRef.current.y;
        setPos((p) => ({ x: Math.max(0, p.x + dx), y: Math.max(0, p.y + dy) }));
        dragRef.current.x = e.clientX;
        dragRef.current.y = e.clientY;
    }

    function onMouseUp() {
        dragRef.current.dragging = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    function handleButton(btn) {
        if (btn === '=') {
            handleEquals();
            return;
        }
        if (btn === 'C') {
            handleClear();
            return;
        }
        if (btn === '⌫') {
            handleBackspace();
            return;
        }
        setDisplay((d) => {
            if (d === 'Error') d = '';
            // dot handling
            if (btn === '.') {
                if (!canAppendDot(d)) return d;
                return d === '' ? '0.' : d + '.';
            }
            // operators (buttons provide ÷ and ×)
            if (isOperator(btn)) {
                if (d === '') return btn === '-' ? '-' : d; // allow leading minus
                const last = d.slice(-1);
                if (isOperator(last)) {
                    return d.slice(0, -1) + btn;
                }
                return d + btn;
            }
            // numbers
            return d === '0' ? btn : d + btn;
        });
    }

    function handleHistoryClick(entry) {
        setDisplay(entry.expression);
        setShowHistory(false);
    }

    function handleMinimize() {
        // Save state to localStorage
        saveMinimizedState({ display, history });
        // Close the calculator UI
        setOpen(false);
    }

    function handleClose() {
        // Clear minimized state on close
        clearMinimizedState();
        setOpen(false);
    }

    function getButtonColor(btn) {
        if (btn === '=')
            return {
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                color: 'white',
                fontWeight: 600,
            };
        if (btn === 'C')
            return {
                bgcolor: '#ef4444',
                '&:hover': { bgcolor: '#dc2626' },
                color: 'white',
                fontWeight: 600,
            };
        if (['÷', '×', '-', '+', '⌫'].includes(btn))
            return {
                bgcolor: '#3b82f6',
                '&:hover': { bgcolor: '#2563eb' },
                color: 'white',
                fontWeight: 600,
            };
        return {
            bgcolor: '#f8fafc',
            '&:hover': { bgcolor: '#e2e8f0' },
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            fontWeight: 500,
        };
    }

    function renderCalculatorContent() {
        // style overrides are resolved at component scope (see variables computed earlier)
        return (
            <Paper
                elevation={mode === 'floating' ? 8 : 3}
                sx={{
                    width,
                    height,
                    background: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    ...paperOverrides,
                }}
                ref={rootRef}
            >
                <Stack spacing={0} sx={{ height: '100%' }}>
                    {/* Title Bar */}
                    <Box
                        className="calc-drag-handle"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1.5,
                            bgcolor: '#f8fafc',
                            borderBottom: '1px solid #e2e8f0',
                            cursor: mode === 'floating' ? 'move' : 'default',
                            userSelect: 'none',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {mode === 'floating' && (
                                <DragHandleIcon sx={{ color: '#64748b', fontSize: '20px' }} />
                            )}
                            <Typography
                                variant="h6"
                                sx={{ color: '#1e293b', fontWeight: 600, fontSize: '16px' }}
                            >
                                {title}
                            </Typography>
                        </Box>
                        {mode === 'floating' && (
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => setShowHistory((h) => !h)}
                                    aria-label="history"
                                    sx={{
                                        color: '#64748b',
                                        bgcolor: showHistory ? '#e2e8f0' : 'transparent',
                                        '&:hover': { bgcolor: '#e2e8f0' },
                                        ...titleBarOverrides.iconButton,
                                    }}
                                >
                                    <HistoryIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleMinimize}
                                    aria-label="minimize"
                                    sx={{
                                        color: '#64748b',
                                        '&:hover': { bgcolor: '#e2e8f0' },
                                        ...titleBarOverrides.iconButton,
                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleClose}
                                    aria-label="close"
                                    sx={{
                                        color: '#64748b',
                                        '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' },
                                        ...titleBarOverrides.iconButton,
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>

                    {/* Display - hide when viewing history to avoid duplicate input inside history area */}
                    {!showHistory && (
                        <Box sx={{ px: 2, pt: 2, pb: 1.5, bgcolor: '#f8fafc' }}>
                            <TextField
                                value={display}
                                size="small"
                                fullWidth
                                autoComplete="off"
                                inputProps={{
                                    'aria-label': 'calculator display',
                                    style: {
                                        textAlign: 'right',
                                        fontSize: '32px',
                                        fontWeight: 600,
                                        color: '#0f172a',
                                        padding: '12px',
                                    },
                                }}
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#e2e8f0' },
                                        '&:hover fieldset': { borderColor: '#cbd5e1' },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3b82f6',
                                            borderWidth: '2px',
                                        },
                                    },
                                    ...displayOverrides,
                                }}
                                onChange={(e) => {
                                    setDisplay(e.target.value);
                                }}
                            />
                        </Box>
                    )}

                    {/* Main Content Area */}
                
                        {showHistory ? (
                            <Box
                                sx={{
                                    bgcolor: 'white',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        bgcolor: '#f8fafc',
                                        ...historyOverrides.container,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            ...historyTitleOverrides,
                                        }}
                                    >
                                        {historyTitle}
                                    </Typography>
                                </Box>
                                <List sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', p: 0 }}>
                                    {history.length === 0 ? (
                                        <ListItem>
                                            <ListItemText
                                                primary="No history yet"
                                                sx={{ textAlign: 'center', color: '#94a3b8' }}
                                            />
                                        </ListItem>
                                    ) : (
                                        [...history].reverse().map((entry, idx) => (
                                            <React.Fragment key={entry.timestamp}>
                                                <ListItemButton
                                                    onClick={() => handleHistoryClick(entry)}
                                                    sx={{
                                                        '&:hover': { bgcolor: '#f8fafc' },
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={entry.expression}
                                                        secondary={'= ' + entry.result}
                                                        primaryTypographyProps={{
                                                            fontWeight: 500,
                                                            fontSize: '0.95rem',
                                                            color: '#0f172a',
                                                        }}
                                                        secondaryTypographyProps={{
                                                            color: '#3b82f6',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </ListItemButton>
                                                {idx < history.length - 1 && <Divider />}
                                            </React.Fragment>
                                        ))
                                    )}
                                </List>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: 0.6,
                                    flex: 1,
                                }}
                            >
                                {BUTTONS.flat().map((b) => (
                                    <Button
                                        key={b}
                                        variant="contained"
                                        onClick={() => {
                                            handleButton(b);
                                            // Visual feedback: set activeKey briefly for mouse click
                                            setActiveKey(String(b));
                                            setTimeout(() => setActiveKey(null), 140);
                                        }}
                                        sx={{
                                            fontSize:
                                                b === '0'
                                                    ? buttonOverrides.zeroFontSize || '14px'
                                                    : buttonOverrides.fontSize || '16px',
                                            lineHeight: 1,
                                            py: buttonOverrides.py ?? 0.9,
                                            px: buttonOverrides.px ?? 1,
                                            fontWeight: buttonOverrides.fontWeight ?? 600,
                                            borderRadius: buttonOverrides.borderRadius ?? '6px',
                                            boxShadow: buttonOverrides.boxShadow ?? 'none',
                                            transition:
                                                buttonOverrides.transition ?? 'all 0.12s ease',
                                            gridColumn: b === '0' ? 'span 2' : 'span 1',
                                            '&:hover': buttonOverrides.hover ?? {
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                                transform: 'translateY(-1px)',
                                            },
                                            '&:active': buttonOverrides.active ?? {
                                                transform: 'translateY(0)',
                                                boxShadow: 'none',
                                            },
                                            ...getButtonColor(b),
                                            ...(buttonOverrides && buttonOverrides.general
                                                ? buttonOverrides.general
                                                : {}),
                                            ...(buttonByKey[b] || {}),
                                            ...(activeKey === String(b)
                                                ? {
                                                      transform: 'translateY(1px)',
                                                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                                                      opacity: 0.9,
                                                      filter: 'brightness(0.92)',
                                                  }
                                                : {}),
                                        }}
                                    >
                                        {b}
                                    </Button>
                                ))}
                            </Box>
                        )}
                </Stack>
            </Paper>
        );
    }

    if (mode === 'embedded') {
        return <Box>{renderCalculatorContent()}</Box>;
    }

    if (mode === 'modal') {
        return (
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        ...modalOverrides,
                    }}
                >
                    {renderCalculatorContent()}
                </Box>
            </Modal>
        );
    }

    return (
        <Box
            onMouseDown={onMouseDownDrag}
            sx={{
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                zIndex: 1300,
            }}
        >
            {renderCalculatorContent()}
        </Box>
    );
}

Calculator.propTypes = {
    mode: PropTypes.oneOf(['embedded', 'modal', 'floating']),
    title: PropTypes.string,
    historyTitle: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    setOpen: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    styleOverrides: PropTypes.object,
};

export { DEFAULT_STYLE_OVERRIDES };
