import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/alumno'
import { getAlumnos } from '../../../domain/alumnos'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'
import { log } from 'console'

const AlumnoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {

    const dispatch = HelperRedux.useDispatch()
    const { filter } = HelperRedux.useSelector((state) => state.alumnos)

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
        console.log(filter.nroDoc,'check')

        dispatch(Actions.setFilterAlumnosStore(filter.nroDoc, filter.legajo))

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

        dispatch(Actions.setFilterAlumnosStore(filter.nroDoc, filter.legajo))
        getAlumnos().then(x => { dispatch(Actions.setAlumnosStore(x.data.value)) })

        onClosed(false)
    }

    return (
        <div className='container-filter'>
            <main>
                <TextInput
                    value={filter.nroDoc}
                    onChange={(event) => dispatch(Actions.setFilterAlumnosStore(event.target.value,filter.legajo))} 
                    label='DNI'
                    
                />

                <TextInput
                    value={filter.legajo}
                    onChange={(event) => dispatch(Actions.setFilterAlumnosStore(filter.nroDoc, event.target.value))}
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