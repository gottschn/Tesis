import React, { useRef, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

/* types */
import { TextInputCompletProps }  from './types'

/* styles */
import './styles.css'

const TextInputComplet: React.FC<TextInputCompletProps> = ({ ...props}) => {
    const menuTextRef = useRef<HTMLUListElement>({} as HTMLUListElement)
    const [valueSearch, setValueSearch] = useState('')

    useEffect(() => {
        if (props.value) setValueSearch(props.value)
    }, [props.value])

    const handlerSearch = (value: any) => {
        setValueSearch(value)

        if (value.length == 0) {
            menuTextRef.current.classList.remove('show')
        } else {
            menuTextRef.current.classList.add('show')
        }
    }

    const handlerSelectedOption = (value: string) => {
        if (props.onSelectedOption) props.onSelectedOption(value)

        menuTextRef.current.classList.remove('show')

        setValueSearch('')
    }

    return(
        <div className='mb-4 container-input'>
            <TextField
                data-testid={props.dataTestIdInput}
                value={valueSearch}
                label={props.label}
                type={'text'}
                onChange={(e) => handlerSearch(e.target.value)}
                error={props.error}
            />

            <ul ref={menuTextRef} className="dropdown-menu ul-style">
                {props.options
                    .filter(o => o.label.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1)
                    .map((x, i) => (
                        <li key={`li-option-${i}`}>
                            <button 
                                data-testid={props.dataTestIdButtonOption} 
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlerSelectedOption(x.value)
                                }} 
                                className="dropdown-item li-style"
                            >
                                {x.label}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default TextInputComplet;