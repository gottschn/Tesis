import React, { VFC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

/* Component */
import { Box, Button, TextField, Typography, Alert} from '@mui/material';
/* Pages */
import './styles.css'
import UTNJPG from '../../components/img/UTNJPG.jpg'

import { UserInit, UserResult } from '../../../types/User';

export type LoginControlValues = Exclude<UserInit, 'app'>

export interface LoginFormProps {
    login: (obj: UserInit) => void
    loading?: boolean
    error?: string
    data?: UserResult
}

const LoginForm: VFC<LoginFormProps> = ({ login, error, loading }) => {

    const { handleSubmit, control } = useForm<LoginControlValues>()
    const [showAlert, setShowAlert] = useState(false)

    const navigate = useNavigate()

    const onSubmit = handleSubmit(({ username, password }) => {
        login({ username, password })
        navigate("/home")
        setShowAlert(true)
    })

    return (
        <Box className='container-login'>
            <Box>
                <form
                    className='form-login flex-column'
                    onSubmit={handleSubmit(() => onSubmit())}
                >
                    <Box className='flex-column'>
                        <Typography variant='h5'>¡Bienvenido al Sistema!</Typography>
                        <Box style={{ width: '40%' }}>
                         <img src={UTNJPG} alt="Logo" />
                        </Box>
                    </Box>

                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Usuario requerido'
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                className=''
                                data-testid="login-user"
                                label="Usuario"
                                id="login-user"
                                name="username"
                                value={value}
                                error={error?.message}
                                onChange={onChange}
                                disabled={loading}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Contraseña requerida'
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                className=''
                                data-testid="login-pass"
                                label="Contraseña"
                                id="login-pass"
                                name="password"
                                type="password"
                                value={value}
                                error={error?.message}
                                onChange={onChange}
                                disabled={loading}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Box className='mt-4'>
                        {error && (
                            <p style={{ fontSize: 12, color: 'red' }}>{error}</p>
                        )}
                        <Button onClick={onSubmit} variant='contained' disabled={loading}>Ingresar</Button>
                    </Box>
                </form>
            </Box>

            {showAlert && 
                <Alert 
                severity="success"
                className='mt-4 alert'
                >This is a success alert — check it out!</Alert>
            }
        </Box>
    )
}

export default LoginForm
