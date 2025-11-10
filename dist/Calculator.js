"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STYLE_OVERRIDES = void 0;
exports["default"] = Calculator;
var _react = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _ListItemButton = _interopRequireDefault(require("@mui/material/ListItemButton"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _Remove = _interopRequireDefault(require("@mui/icons-material/Remove"));
var _DragHandle = _interopRequireDefault(require("@mui/icons-material/DragHandle"));
var _History = _interopRequireDefault(require("@mui/icons-material/History"));
var _Modal = _interopRequireDefault(require("@mui/material/Modal"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var BUTTONS = [['C', '⌫', '÷', '×'], ['7', '8', '9', '-'], ['4', '5', '6', '+'], ['1', '2', '3', '='], ['0', '.']];
var OPERATORS = ['+', '-', '×', '÷', '*', '/'];

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
var DEFAULT_STYLE_OVERRIDES = exports.DEFAULT_STYLE_OVERRIDES = {
  paper: {},
  titleBar: {},
  button: {},
  buttonByKey: {},
  display: {},
  history: {},
  historyTitle: {},
  modal: {}
};
function safeEvaluate(expr) {
  try {
    var cleaned = String(expr).replace(/×/g, '*').replace(/÷/g, '/');
    if (/[^0-9+\-*/(). %]/.test(cleaned)) return 'Error';
    // eslint-disable-next-line no-new-func
    var result = Function('"use strict"; return (' + cleaned + ')')();
    if (result === Infinity || Number.isNaN(result)) return 'Error';
    return String(result);
  } catch (err) {
    return 'Error';
  }
}
var STORAGE_KEY_HISTORY = 'calculator_history';
var STORAGE_KEY_POSITION = 'calculator_position';
var STORAGE_KEY_STATE = 'calculator_minimized_state';
function getStoredHistory() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (_unused) {
    return [];
  }
}
function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(-20)));
  } catch (_unused2) {
    // ignore
  }
}
function getStoredPosition() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY_POSITION);
    return stored ? JSON.parse(stored) : {
      x: 50,
      y: 50
    };
  } catch (_unused3) {
    return {
      x: 50,
      y: 50
    };
  }
}
function savePosition(pos) {
  try {
    localStorage.setItem(STORAGE_KEY_POSITION, JSON.stringify(pos));
  } catch (_unused4) {
    // ignore
  }
}
function getMinimizedState() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY_STATE);
    return stored ? JSON.parse(stored) : null;
  } catch (_unused5) {
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
  var lastOpIndex = Math.max(display.lastIndexOf('+'), display.lastIndexOf('-'), display.lastIndexOf('×'), display.lastIndexOf('÷'), display.lastIndexOf('*'), display.lastIndexOf('/'));
  var token = lastOpIndex === -1 ? display : display.slice(lastOpIndex + 1);
  return token.indexOf('.') === -1;
}
function sanitizeExpression(expr) {
  var sanitized = '';
  var _iterator = _createForOfIteratorHelper(expr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ch = _step.value;
      if (ch === '*') ch = '×';
      if (ch === '/') ch = '÷';
      if (/\d/.test(ch) || ch === '.' || isOperator(ch) || ch === '(' || ch === ')') {
        sanitized += ch;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return sanitized;
}
function saveMinimizedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
  } catch (_unused6) {
    // ignore
  }
}
function clearMinimizedState() {
  try {
    localStorage.removeItem(STORAGE_KEY_STATE);
  } catch (_unused7) {
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
function Calculator(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'embedded' : _ref$mode,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'Calculator' : _ref$title,
    _ref$historyTitle = _ref.historyTitle,
    historyTitle = _ref$historyTitle === void 0 ? 'Calculation History' : _ref$historyTitle,
    _ref$initiallyOpen = _ref.initiallyOpen,
    initiallyOpen = _ref$initiallyOpen === void 0 ? false : _ref$initiallyOpen,
    _ref$initialValue = _ref.initialValue,
    initialValue = _ref$initialValue === void 0 ? '' : _ref$initialValue,
    onChange = _ref.onChange,
    onOpen = _ref.onOpen,
    onClose = _ref.onClose,
    externalSetOpen = _ref.setOpen,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 380 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 500 : _ref$height,
    _ref$styleOverrides = _ref.styleOverrides,
    styleOverrides = _ref$styleOverrides === void 0 ? {} : _ref$styleOverrides;
  var _useState = (0, _react.useState)(mode === 'embedded' ? true : initiallyOpen),
    _useState2 = _slicedToArray(_useState, 2),
    internalOpen = _useState2[0],
    setInternalOpen = _useState2[1];
  var open = externalSetOpen ? mode === 'embedded' ? true : initiallyOpen : internalOpen;
  var setOpen = externalSetOpen || setInternalOpen;
  var _useState3 = (0, _react.useState)(String(initialValue || '')),
    _useState4 = _slicedToArray(_useState3, 2),
    display = _useState4[0],
    setDisplay = _useState4[1];
  var _useState5 = (0, _react.useState)(getStoredHistory),
    _useState6 = _slicedToArray(_useState5, 2),
    history = _useState6[0],
    setHistory = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showHistory = _useState8[0],
    setShowHistory = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    activeKey = _useState0[0],
    setActiveKey = _useState0[1];
  var rootRef = (0, _react.useRef)(null);
  var dragRef = (0, _react.useRef)({
    dragging: false,
    x: 0,
    y: 0
  });
  var _useState1 = (0, _react.useState)(getStoredPosition),
    _useState10 = _slicedToArray(_useState1, 2),
    pos = _useState10[0],
    setPos = _useState10[1];

  // resolve styleOverrides once per render so modal and inner render can share it
  var _nested = _typeof(styleOverrides) === 'object' && (styleOverrides.paper || styleOverrides.button || styleOverrides.display);
  var _resolved = _nested ? _objectSpread(_objectSpread({}, DEFAULT_STYLE_OVERRIDES), styleOverrides) : _objectSpread(_objectSpread({}, DEFAULT_STYLE_OVERRIDES), {}, {
    paper: styleOverrides
  });
  var paperOverrides = _resolved.paper || {};
  var titleBarOverrides = _resolved.titleBar || {};
  var buttonOverrides = _resolved.button || {};
  var buttonByKey = _resolved.buttonByKey || {};
  var displayOverrides = _resolved.display || {};
  var historyOverrides = _resolved.history || {};
  var historyTitleOverrides = _resolved.historyTitle || {};
  var modalOverrides = _resolved.modal || {};

  // On mount, check if there's a minimized state to restore
  (0, _react.useEffect)(function () {
    if (mode === 'floating') {
      var minimizedState = getMinimizedState();
      if (minimizedState && initiallyOpen) {
        setDisplay(minimizedState.display);
        setHistory(minimizedState.history);
        clearMinimizedState();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleOnChange = (0, _react.useCallback)(onChange, [onChange]);
  var handleOnOpen = (0, _react.useCallback)(onOpen, [onOpen]);
  var handleOnClose = (0, _react.useCallback)(onClose, [onClose]);
  (0, _react.useEffect)(function () {
    if (typeof handleOnChange === 'function') handleOnChange(display);
  }, [display, handleOnChange]);
  (0, _react.useEffect)(function () {
    if (open && typeof handleOnOpen === 'function') handleOnOpen();
    if (!open && typeof handleOnClose === 'function') handleOnClose();
  }, [open, handleOnOpen, handleOnClose]);

  // Save position when it changes
  (0, _react.useEffect)(function () {
    if (mode === 'floating') {
      savePosition(pos);
    }
  }, [pos, mode]);
  var handleClear = (0, _react.useCallback)(function () {
    setDisplay('');
  }, []);
  var handleBackspace = (0, _react.useCallback)(function () {
    setDisplay(function (d) {
      var next = d.length <= 1 ? '' : d.slice(0, -1);
      return next;
    });
  }, []);
  var handleEquals = (0, _react.useCallback)(function () {
    setDisplay(function (d) {
      if (!d || d === 'Error') return d;
      var sanitized = sanitizeExpression(d);
      if (!sanitized) return d;
      var exprForEval = toEvalExpression(sanitized);
      var result = safeEvaluate(exprForEval);
      if (result !== 'Error') {
        var newEntry = {
          expression: sanitized,
          result: result,
          timestamp: Date.now()
        };
        setHistory(function (h) {
          var newHistory = [].concat(_toConsumableArray(h), [newEntry]);
          saveHistory(newHistory);
          return newHistory;
        });
      }
      return result;
    });
  }, []);
  (0, _react.useEffect)(function () {
    var keyClearTimer = null;
    function onKeyDown(e) {
      if (!open || showHistory) return;
      var rawKey = e.key;
      var key = rawKey === '*' ? '×' : rawKey === '/' ? '÷' : rawKey === 'Enter' ? '=' : rawKey === 'Backspace' ? '⌫' : rawKey;
      setActiveKey(key);
      if (keyClearTimer) clearTimeout(keyClearTimer);
      keyClearTimer = setTimeout(function () {
        return setActiveKey(null);
      }, 140);
      if (/^[0-9.+\-×÷()]$/.test(key)) {
        setDisplay(function (d) {
          if (d === 'Error') return key;
          if (key === '.') {
            return canAppendDot(d) ? d === '' ? '0.' : d + '.' : d;
          }
          if (isOperator(key)) {
            if (d === '') return key === '-' ? '-' : d;
            var last = d.slice(-1);
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
        keyClearTimer = setTimeout(function () {
          return setActiveKey(null);
        }, 140);
        handleEquals();
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        setActiveKey('⌫');
        if (keyClearTimer) clearTimeout(keyClearTimer);
        keyClearTimer = setTimeout(function () {
          return setActiveKey(null);
        }, 140);
        handleBackspace();
        e.preventDefault();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        setActiveKey(e.key.toLowerCase() === 'c' ? 'C' : 'C');
        if (keyClearTimer) clearTimeout(keyClearTimer);
        keyClearTimer = setTimeout(function () {
          return setActiveKey(null);
        }, 140);
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
    return function () {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (keyClearTimer) clearTimeout(keyClearTimer);
    };
  }, [open, showHistory, handleEquals, handleBackspace, handleClear]);
  function onMouseDownDrag(e) {
    // Only drag from the title bar area
    if (e.target.closest('.calc-drag-handle')) {
      dragRef.current = {
        dragging: true,
        x: e.clientX,
        y: e.clientY
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    }
  }
  function onMouseMove(e) {
    if (!dragRef.current.dragging) return;
    var dx = e.clientX - dragRef.current.x;
    var dy = e.clientY - dragRef.current.y;
    setPos(function (p) {
      return {
        x: Math.max(0, p.x + dx),
        y: Math.max(0, p.y + dy)
      };
    });
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
    setDisplay(function (d) {
      if (d === 'Error') d = '';
      // dot handling
      if (btn === '.') {
        if (!canAppendDot(d)) return d;
        return d === '' ? '0.' : d + '.';
      }
      // operators (buttons provide ÷ and ×)
      if (isOperator(btn)) {
        if (d === '') return btn === '-' ? '-' : d; // allow leading minus
        var last = d.slice(-1);
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
    saveMinimizedState({
      display: display,
      history: history
    });
    // Close the calculator UI
    setOpen(false);
  }
  function handleClose() {
    // Clear minimized state on close
    clearMinimizedState();
    setOpen(false);
  }
  function getButtonColor(btn) {
    if (btn === '=') return {
      bgcolor: '#10b981',
      '&:hover': {
        bgcolor: '#059669'
      },
      color: 'white',
      fontWeight: 600
    };
    if (btn === 'C') return {
      bgcolor: '#ef4444',
      '&:hover': {
        bgcolor: '#dc2626'
      },
      color: 'white',
      fontWeight: 600
    };
    if (['÷', '×', '-', '+', '⌫'].includes(btn)) return {
      bgcolor: '#3b82f6',
      '&:hover': {
        bgcolor: '#2563eb'
      },
      color: 'white',
      fontWeight: 600
    };
    return {
      bgcolor: '#f8fafc',
      '&:hover': {
        bgcolor: '#e2e8f0'
      },
      color: '#1e293b',
      border: '1px solid #e2e8f0',
      fontWeight: 500
    };
  }
  function renderCalculatorContent() {
    // style overrides are resolved at component scope (see variables computed earlier)
    return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
      elevation: mode === 'floating' ? 8 : 3,
      sx: _objectSpread({
        width: width,
        height: height,
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }, paperOverrides),
      ref: rootRef
    }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      spacing: 0,
      sx: {
        height: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      className: "calc-drag-handle",
      sx: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
        bgcolor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        cursor: mode === 'floating' ? 'move' : 'default',
        userSelect: 'none'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }
    }, mode === 'floating' && /*#__PURE__*/_react["default"].createElement(_DragHandle["default"], {
      sx: {
        color: '#64748b',
        fontSize: '20px'
      }
    }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "h6",
      sx: {
        color: '#1e293b',
        fontWeight: 600,
        fontSize: '16px'
      }
    }, title)), mode === 'floating' && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        display: 'flex',
        gap: 0.5
      }
    }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      size: "small",
      onClick: function onClick() {
        return setShowHistory(function (h) {
          return !h;
        });
      },
      "aria-label": "history",
      sx: _objectSpread({
        color: '#64748b',
        bgcolor: showHistory ? '#e2e8f0' : 'transparent',
        '&:hover': {
          bgcolor: '#e2e8f0'
        }
      }, titleBarOverrides.iconButton)
    }, /*#__PURE__*/_react["default"].createElement(_History["default"], {
      fontSize: "small"
    })), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      size: "small",
      onClick: handleMinimize,
      "aria-label": "minimize",
      sx: _objectSpread({
        color: '#64748b',
        '&:hover': {
          bgcolor: '#e2e8f0'
        }
      }, titleBarOverrides.iconButton)
    }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
      fontSize: "small"
    })), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      size: "small",
      onClick: handleClose,
      "aria-label": "close",
      sx: _objectSpread({
        color: '#64748b',
        '&:hover': {
          bgcolor: '#fee2e2',
          color: '#dc2626'
        }
      }, titleBarOverrides.iconButton)
    }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
      fontSize: "small"
    })))), !showHistory && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        px: 2,
        pt: 2,
        pb: 1.5,
        bgcolor: '#f8fafc'
      }
    }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      value: display,
      size: "small",
      fullWidth: true,
      autoComplete: "off",
      inputProps: {
        'aria-label': 'calculator display',
        style: {
          textAlign: 'right',
          fontSize: '32px',
          fontWeight: 600,
          color: '#0f172a',
          padding: '12px'
        }
      },
      sx: _objectSpread({
        bgcolor: '#ffffff',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#e2e8f0'
          },
          '&:hover fieldset': {
            borderColor: '#cbd5e1'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3b82f6',
            borderWidth: '2px'
          }
        }
      }, displayOverrides),
      onChange: function onChange(e) {
        setDisplay(e.target.value);
      }
    })), showHistory ? /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        bgcolor: 'white',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: _objectSpread({
        p: 1.5,
        bgcolor: '#f8fafc'
      }, historyOverrides.container)
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "subtitle2",
      sx: _objectSpread({
        fontWeight: 600,
        color: '#1e293b'
      }, historyTitleOverrides)
    }, historyTitle)), /*#__PURE__*/_react["default"].createElement(_List["default"], {
      sx: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        p: 0
      }
    }, history.length === 0 ? /*#__PURE__*/_react["default"].createElement(_ListItem["default"], null, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      primary: "No history yet",
      sx: {
        textAlign: 'center',
        color: '#94a3b8'
      }
    })) : _toConsumableArray(history).reverse().map(function (entry, idx) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
        key: entry.timestamp
      }, /*#__PURE__*/_react["default"].createElement(_ListItemButton["default"], {
        onClick: function onClick() {
          return handleHistoryClick(entry);
        },
        sx: {
          '&:hover': {
            bgcolor: '#f8fafc'
          }
        }
      }, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
        primary: entry.expression,
        secondary: '= ' + entry.result,
        primaryTypographyProps: {
          fontWeight: 500,
          fontSize: '0.95rem',
          color: '#0f172a'
        },
        secondaryTypographyProps: {
          color: '#3b82f6',
          fontWeight: 600
        }
      })), idx < history.length - 1 && /*#__PURE__*/_react["default"].createElement(_Divider["default"], null));
    }))) : /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0.6,
        flex: 1
      }
    }, BUTTONS.flat().map(function (b) {
      var _buttonOverrides$py, _buttonOverrides$px, _buttonOverrides$font, _buttonOverrides$bord, _buttonOverrides$boxS, _buttonOverrides$tran, _buttonOverrides$hove, _buttonOverrides$acti;
      return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        key: b,
        variant: "contained",
        onClick: function onClick() {
          handleButton(b);
          // Visual feedback: set activeKey briefly for mouse click
          setActiveKey(String(b));
          setTimeout(function () {
            return setActiveKey(null);
          }, 140);
        },
        sx: _objectSpread(_objectSpread(_objectSpread(_objectSpread({
          fontSize: b === '0' ? buttonOverrides.zeroFontSize || '14px' : buttonOverrides.fontSize || '16px',
          lineHeight: 1,
          py: (_buttonOverrides$py = buttonOverrides.py) !== null && _buttonOverrides$py !== void 0 ? _buttonOverrides$py : 0.9,
          px: (_buttonOverrides$px = buttonOverrides.px) !== null && _buttonOverrides$px !== void 0 ? _buttonOverrides$px : 1,
          fontWeight: (_buttonOverrides$font = buttonOverrides.fontWeight) !== null && _buttonOverrides$font !== void 0 ? _buttonOverrides$font : 600,
          borderRadius: (_buttonOverrides$bord = buttonOverrides.borderRadius) !== null && _buttonOverrides$bord !== void 0 ? _buttonOverrides$bord : '6px',
          boxShadow: (_buttonOverrides$boxS = buttonOverrides.boxShadow) !== null && _buttonOverrides$boxS !== void 0 ? _buttonOverrides$boxS : 'none',
          transition: (_buttonOverrides$tran = buttonOverrides.transition) !== null && _buttonOverrides$tran !== void 0 ? _buttonOverrides$tran : 'all 0.12s ease',
          gridColumn: b === '0' ? 'span 2' : 'span 1',
          '&:hover': (_buttonOverrides$hove = buttonOverrides.hover) !== null && _buttonOverrides$hove !== void 0 ? _buttonOverrides$hove : {
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            transform: 'translateY(-1px)'
          },
          '&:active': (_buttonOverrides$acti = buttonOverrides.active) !== null && _buttonOverrides$acti !== void 0 ? _buttonOverrides$acti : {
            transform: 'translateY(0)',
            boxShadow: 'none'
          }
        }, getButtonColor(b)), buttonOverrides && buttonOverrides.general ? buttonOverrides.general : {}), buttonByKey[b] || {}), activeKey === String(b) ? {
          transform: 'translateY(1px)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
          opacity: 0.9,
          filter: 'brightness(0.92)'
        } : {})
      }, b);
    }))));
  }
  if (mode === 'embedded') {
    return /*#__PURE__*/_react["default"].createElement(_Box["default"], null, renderCalculatorContent());
  }
  if (mode === 'modal') {
    return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
      open: open,
      onClose: handleClose
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: _objectSpread({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }, modalOverrides)
    }, renderCalculatorContent()));
  }
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    onMouseDown: onMouseDownDrag,
    sx: {
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      zIndex: 1300
    }
  }, renderCalculatorContent());
}
Calculator.propTypes = {
  mode: _propTypes["default"].oneOf(['embedded', 'modal', 'floating']),
  title: _propTypes["default"].string,
  historyTitle: _propTypes["default"].string,
  initiallyOpen: _propTypes["default"].bool,
  initialValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  onChange: _propTypes["default"].func,
  onOpen: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  setOpen: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  styleOverrides: _propTypes["default"].object
};