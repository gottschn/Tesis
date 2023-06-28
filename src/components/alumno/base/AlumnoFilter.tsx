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
    const [apynom, setApynom] = useState('')
    const [tipoDoc, setTipoDoc] = useState('')
    const [nroDoc, setNroDoc] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mail, setMail] = useState('')
    const [extensionId, setExtensionId] = useState('')
    const [extension, setExtension] = useState('')
    const [ciudadId, setCiudadId] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [pagos, setPagos] = useState('')
    const [carrerasId, setCarrerasId] = useState('')
    const [carreras, setCarreras] = useState('')

    const [legajo, setLegajo] = useState('')


    const handlerFilter = () => {

        dispatch(Actions.getAlumnos(
            id,
            legajo,
            apynom,
            tipoDoc,
            nroDoc,
            fechaNacimiento,
            fechaIngreso,
            direccion,
            telefono,
            mail,
            extensionId,
            extension,
            ciudadId,
            ciudad,
            codigoPostal,
            pagos,
            carrerasId,
            carreras,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setApynom('')
        setTipoDoc('')
        setNroDoc('')
        setFechaNacimiento('')
        setFechaIngreso('')
        setDireccion('')
        setTelefono('')
        setMail('')
        setExtensionId('')
        setExtension('')
        setCiudadId('')
        setCiudad('')
        setCodigoPostal('')
        setPagos('')
        setCarrerasId('')
        setCarreras('')

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