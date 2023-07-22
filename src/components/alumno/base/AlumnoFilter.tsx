import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/alumno'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'

const AlumnoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {

    const dispatch = HelperRedux.useDispatch()

    const [nroDoc, setNroDoc] = useState('')
    const [legajo, setLegajo] = useState('')


    const handlerFilter = () => {
        dispatch(Actions.setFilterAlumnosStore(nroDoc, legajo))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        dispatch(Actions.setFilterAlumnosStore('', ''))
        setLegajo('')
        setNroDoc('')
        onClosed(false)
    }

    return (
        <div className='container-filter' style={{ width: '260px' }} >
            <main>
                <TextInput
                    value={nroDoc}
                    onChange={(event) => setNroDoc(event.target.value)} 
                    label='DNI'
                    
                />

                <TextInput
                    value={legajo}
                    onChange={(event) => setLegajo(event.target.value)}
                    label='Legajo'
                />
            </main>

            <footer className='d-flex justify-content-between mt-3'>
                <div className='d-flex'>
                    <Button
                        className='btn mx-1'
                        title='Limpiar'
                        variant='outline-danger'
                        onClick={handlerClearFilter}
                    >
                        Limpiar
                    </Button>

                    <Button
                        className='btn mx-5'
                        title='Aplicar'
                        variant='outline-success'
                        onClick={() => handlerFilter()}
                    >
                        Aplicar
                    </Button>
                </div>

            </footer>
        </div>
    )
}

export default AlumnoFilter;