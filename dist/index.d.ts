import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface ButtonStyleOverrides {
    py?: number | string;
    px?: number | string;
    fontWeight?: number | string;
    borderRadius?: number | string;
    boxShadow?: string;
    transition?: string;
    zeroFontSize?: string;
    fontSize?: string;
    hover?: SxProps<Theme>;
    active?: SxProps<Theme>;
    general?: SxProps<Theme>;
    [key: string]: any;
}

export interface ButtonByKeyOverrides {
    [key: string]: SxProps<Theme> | undefined;
}

export interface PaperStyleOverrides extends Record<string, any> {
    zIndex?: number;
    bgcolor?: string;
    background?: string;
    borderRadius?: number | string;
    boxShadow?: number | string;
    border?: string;
    width?: number | string;
    height?: number | string;
}

export interface StyleOverrides {
    paper?: PaperStyleOverrides | SxProps<Theme>;
    titleBar?: SxProps<Theme>;
    button?: ButtonStyleOverrides;
    buttonByKey?: ButtonByKeyOverrides;
    display?: SxProps<Theme>;
    history?: SxProps<Theme>;
    historyTitle?: SxProps<Theme>;
    modal?: SxProps<Theme>;
}

export type CalculatorMode = 'embedded' | 'modal' | 'floating';

export interface CalculatorProps {
    mode?: CalculatorMode;
    title?: string;
    historyTitle?: string;
    initiallyOpen?: boolean;
    initialValue?: string | number;
    onChange?: (value: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
    setOpen?: (open: boolean) => void;
    width?: number;
    height?: number;
    styleOverrides?: StyleOverrides | SxProps<Theme>;
}

declare const Calculator: React.FC<CalculatorProps>;
export declare const DEFAULT_STYLE_OVERRIDES: Required<StyleOverrides>;
export default Calculator;
