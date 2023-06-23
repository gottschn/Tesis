import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'

import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'
import { Actions } from '../../../@redux/usuario/actions'
import { getUsuarios } from '../../../domain/usuarios'

/** redux */


const UsuarioFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const [personaId, setPersonaId] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getUsuarios(
            id,
            nombre,
            password,
            rol,
            personaId,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setNombre('')

        getUsuarios().then(x => { dispatch(Actions.setUsuariosStore(x.data.value)) })
        dispatch(Actions.setFilterUsuariosStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label='Codigo Del Usuario'
                />
                <TextInput
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    label='Nombre'
                />
                <TextInput
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    label='Rol'
                />
            </main>

            <footer className='d-flex justify-content-between mt-3'>
                <div className='d-flex'>
                    <Button
                        className='btn mx-1'
                        title='Limpiar'
                        onClick={handlerClearFilter}
                    >
                        Limpiar
                    </Button>

                    <Button
                        className='btn'
                        title='Aplicar'
                        onClick={() => handlerFilter()}
                    >
                        Aplicar
                    </Button>
                </div>

            </footer>
        </div>
    )
}

export default UsuarioFilter;