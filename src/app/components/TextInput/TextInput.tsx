import React from "react";

import TextField from '@mui/material/TextField';

/** types */
import { TextInputProps } from './types'

const TextInput: React.FC<TextInputProps> = ({ type = 'text', ...props}) => {
    
    return(
        <div className='mb-4'>
            <TextField
                data-testid={props.dataTestId}
                type={type}
                {...props}
            />
        </div>
    )
}

export default TextInput;