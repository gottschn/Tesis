import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/precioCarrera'
import { getPrecioCarreras } from '../../../domain/precioCarreras'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'

const PrecioCarreraFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    const dispatch = HelperRedux.useDispatch()
    const { filter } = HelperRedux.useSelector(state => state.precioCarrera)

    const handlerClearFilter = () => {

        getPrecioCarreras().then(x => { dispatch(Actions.setPrecioCarrerasStore(x.data.value)) })
        dispatch(Actions.setPrecioCarrerasFilter('', ''))

        onClosed(false)
    }

    const handlerFilter = () => {

        dispatch(Actions.getPrecioCarreras(filter.carreraId, filter.monto))

        console.log("funca xd")

        onClosed(true)
    }

    return (
        <div className='container-filter' style={{ width: '280px' }} >

            <TextInput

                value={filter.carreraId}
                onChange={(event) => dispatch(Actions.setPrecioCarrerasFilter(event.target.value, filter.monto))}
                label='Codigo de Carrera'
            />

            <TextInput
                value={filter.monto}
                onChange={(event) => dispatch(Actions.setPrecioCarrerasFilter(filter.carreraId, event.target.value))}
                label='Monto'
            />


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
                        onClick={handlerFilter}
                    >
                        Aplicar
                    </Button>
                </div>

            </footer>
        </div>
    )
}

export default PrecioCarreraFilter;