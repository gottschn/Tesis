import { TextFieldProps } from '@mui/material';
import React from 'react'

type TextInputProps = TextFieldProps & {
    dataTestId?: string;
    value?: number | string;
}

type TextInputCompletProps = TextInputProps & {
    options: OptionProps[];
    onSelectedOption?: (value: string) => void;
    dataTestIdInput?: string;
    dataTestIdButtonOption?: string;
    error?: string;
    value?: string | any;
}

interface OptionProps {
    value: string;
    label: string;
}

export {
    TextInputProps,
    OptionProps,
    TextInputCompletProps
}