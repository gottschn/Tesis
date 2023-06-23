import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/carreras'
import { getCarreras } from '../../../domain/carreras'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'

/** redux */


const CiudadFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cantCuotas, setCantCuotas] = useState('')
    const [precioCuo, setprecioCuo] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getCarreras(
            id,
            descripcion,
            cantCuotas,
            precioCuo
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setDescripcion('')
        setCantCuotas('')
        setprecioCuo('')

        getCarreras().then(x => { dispatch(Actions.setCarrerasStore(x.data.value)) })
        dispatch(Actions.setFilterCarreraStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label='Codigo de Ciudad'
                />
                <TextInput
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    label='Descripcion'
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

export default CiudadFilter;