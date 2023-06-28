import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'
import { Actions } from '../../../@redux/empleado/actions'
import { getEmpleados } from '../../../domain/empleados'

/** redux */

const EmpleadoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
    

    const dispatch = HelperRedux.useDispatch()
    const [id, setId] = useState('')
    const [apynom, setApynom] = useState('')
    const [tipoDoc, setTipoDoc] = useState('')
    const [nroDoc, setNroDoc] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mail, setMail] = useState('')
    const [extensionId, setExtensionId] = useState('')
    const [extension, setExtesion] = useState('')
    const [ciudadId, setCiudadId] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [areaTrabajo, setAreaTrabajo] = useState('')

    const handlerFilter = () => {

        dispatch(Actions.getEmpleados(
            id,
            apynom,
            tipoDoc,
            nroDoc,
            fechaNacimiento,
            direccion,
            telefono,
            mail,
            extensionId,
            extension,
            ciudadId,
            ciudad,
            codigoPostal,
            areaTrabajo,
        ))

        onClosed(true)
    }

    const handlerClearFilter = () => {
        setId('')
        setApynom('')
        setTipoDoc('')
        setNroDoc('')
        setFechaNacimiento('')
        setDireccion('')
        setTelefono('')
        setMail('')
        setExtensionId('')
        setExtesion('')
        setCiudadId('')
        setCiudad('')
        setCodigoPostal('')
        setAreaTrabajo('')

        getEmpleados().then(x => { dispatch(Actions.setEmpleadosStore(x.data.value)) })
        dispatch(Actions.setFilterEmpleadosStore())

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
                    value={apynom}
                    onChange={(e) => setApynom(e.target.value)}
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

export default EmpleadoFilter;