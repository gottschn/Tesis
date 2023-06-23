import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'
import { Actions } from '../../../@redux/extension/actions'
import { getExtensiones } from '../../../domain/extensiones'

/** redux */


const ExtensionFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getExtensiones(
            id,
            descripcion,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setDescripcion('')

        getExtensiones().then(x => { dispatch(Actions.setExtensionesStore(x.data.value)) })
        dispatch(Actions.setFilterExtensionesStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label='Codigo de Extension'
                />
                <TextInput
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    label='Nombre'
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

export default ExtensionFilter;