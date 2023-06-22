import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/alumno'
import { getAlumnos } from '../../../domain/alumnos'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'
import moment from 'moment'

/** redux */

const AlumnoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    

    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mail, setMail] = useState('')
    const [porcBeca, setPorcBeca] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState('')
    const [legajo, setLegajo] = useState('')
    const [carreraId, setCarreraId] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getAlumnos(
            id,
            nombre,
            apellido,
            dni,
            legajo,
            direccion,
            mail,
            porcBeca,
            telefono,
            carreraId,
            fechaIngreso,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setNombre('')
        setApellido('')
        setDni('')
        setDireccion('')
        setTelefono('')
        setMail('')
        setPorcBeca('')
        setFechaIngreso('')
        setLegajo('')
        setCarreraId('')

        getAlumnos().then(x => { dispatch(Actions.setAlumnosStore(x.data.value)) })
        dispatch(Actions.setFilterAlumnosStore())

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label='DNI'
                />

                <TextInput
                    value={legajo}
                    onChange={(e) => setLegajo(e.target.value)}
                    label='Legajo'
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

export default AlumnoFilter;