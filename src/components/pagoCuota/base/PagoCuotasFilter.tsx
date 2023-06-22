import React, { useState } from 'react'
/** redux */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/PagoCuota'

/** components */
import { TextInput } from '../../../app/components/TextInput'

/** styles */
import { getPagoCuotas } from '../../../domain/pagoCuotas'
import { Button } from 'react-bootstrap'


const PagoCuotasFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    

    const dispatch = HelperRedux.useDispatch()
    const [cuotaId, setCuotaId] = useState('')
    const [monto, setMonto] = useState('')
    const [porcPago, setPorcPago] = useState('')
    const [fechaPago, setFechaPago] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getPagoCuotas(
            monto,
            porcPago,
            fechaPago,
            cuotaId,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setCuotaId('')
        setMonto('')
        setPorcPago('')
        setFechaPago('')


        getPagoCuotas().then(x => { dispatch(Actions.setPagoCuotasStore(x.data.value)) })
        dispatch(Actions.setPagoCuotasFilterStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={cuotaId}
                    onChange={(e) => setCuotaId(e.target.value)}
                    label='Cuota ID'
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

export default PagoCuotasFilter;