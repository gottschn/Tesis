import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/precioCarrera'
import { getPrecioCarreras } from '../../../domain/precioCarreras'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'

/** redux */


const PrecioCarreraFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [monto, setMonto] = useState('')
    const [fecha, setFecha] = useState('')
    const [carreraId, setCarreraId] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getPrecioCarreras(
            monto,
            fecha,
            carreraId
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setMonto('')
        setFecha('')
        setCarreraId('')

        getPrecioCarreras().then(x => { dispatch(Actions.setPrecioCarrerasStore(x.data.value)) })
        dispatch(Actions.setPrecioCarrerasFilter())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label='Codigo de Carrera'
                />
                <TextInput
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    label='Monto'
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

export default PrecioCarreraFilter;