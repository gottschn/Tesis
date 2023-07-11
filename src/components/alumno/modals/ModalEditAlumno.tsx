import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AlumnoProps } from "../../../@redux/alumno/types";
import { updateAlumno } from "../../../domain/alumnos";
import { Actions } from "../../../@redux/alumno";
import { Actions as ActionsCarrera} from "../../../@redux/carreras";
import { getCarreras } from "../../../domain/carreras";
import { Actions as ActionsExtensiones } from '../../../@redux/extension';
import { Actions as ActionsCiudades } from '../../../@redux/ciudad';
import { getCiudades } from "../../../domain/ciudades";
import { getExtensiones } from "../../../domain/extensiones";


const ModalEditAlumno:React.FC<{ 
    alumno: AlumnoProps;
    visible: boolean;
    onClosedModal: () => void;
}> = ({...props}) => {

    const [form, setForm] = useState<AlumnoProps>({} as AlumnoProps);

    const  dispatch = HelperRedux.useDispatch()
    const { carreras, ciudades, extensiones } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target;
        if(name === 'carreraId'){
            setForm({
              ...form,
              [name]: parseInt(value),
            });
            return
        }
        if(name === 'ciudadId'){
            setForm({
              ...form,
              [name]: parseInt(value),
            });
            return
        }
        if(name === 'extensionId'){
            setForm({
              ...form,
              [name]: parseInt(value),
            });
            return
        }
        setForm({
            ...form,
            [name]: value,
        });
    };
    
    useEffect(() => {
        getCarreras()
            .then(x => dispatch(ActionsCarrera.setCarrerasStore(x.data.value)))
            .catch(() => alert('Se produjo un bardo'))
        getCiudades()
            .then(x => dispatch(ActionsCiudades.setCiudadesStore(x.data.value)))
            .catch(() => alert('Se produjo un bardo'))
        getExtensiones()
            .then(x => dispatch(ActionsExtensiones.setExtensionesStore(x.data.value)))
            .catch(() => alert('Se produjo un bardo'))
    }, [])
    useEffect(() => {
        
        setForm({
            id: props.alumno.id,
            legajo: props.alumno.legajo,
            apynom: props.alumno.apynom,
            tipoDoc: props.alumno.tipoDoc,
            nroDoc: props.alumno.nroDoc,
            carreraId: props.alumno.carreraId,
            carreras: props.alumno.carreras,
            pagos: props.alumno.pagos,
            fechaNacimiento: props.alumno.fechaNacimiento,
            fechaIngreso: props.alumno.fechaIngreso,
            direccion:props.alumno.direccion,
            telefono:props.alumno.telefono,
            mail: props.alumno.mail,
            extensionId: props.alumno.extensionId,
            extension: props.alumno.extension,
            ciudadId:props.alumno.ciudadId,
            ciudad: props.alumno.ciudad,
            codigoPostal: props.alumno.codigoPostal,
            desde: props.alumno.desde,
            hasta: props.alumno.hasta,
        })
    }, [props.alumno?.id])
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // setErrorMsg(null);
        updateAlumno(
            form.id,
            form.legajo,
            form.apynom,
            form.tipoDoc,
            form.nroDoc,
            form.fechaNacimiento,
            form.direccion,
            form.telefono,
            form.mail,
            form.fechaIngreso,
            form.carreraId,
            form.ciudadId,
            form.extensionId,
            form.codigoPostal,
            ).then(() => {
            dispatch(Actions.updateAlumnos({...form}, form.id))
        })
        .catch(error => console.log(error, "Error"))
        .finally(() => props.onClosedModal())
      };
      
    return (
        <>
            <Modal
                show={props.visible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar Alumno
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                key={form.legajo}
                                type="text"
                                placeholder="Legajo"
                                name="legajo"
                                value={form.legajo}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control
                                key={form.apynom}
                                type="text"
                                placeholder="Nombre y Apellido"
                                name="apynom"
                                value={form.apynom}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                key={form.tipoDoc}
                                type="text"
                                placeholder="Tipo de Documento"
                                name="tipoDoc"
                                value={form.tipoDoc}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numero de Documento</Form.Label>
                            <Form.Control
                                key={form.nroDoc}
                                type="text"
                                placeholder="Numero de Documento"
                                name="nroDoc"
                                value={form.nroDoc}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        {/*    <Form.Group className="mb-3">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Nacimiento"
                                name="fechaNacimiento"
                                value={fechaNacimiento}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                                key={form.direccion}
                                type="text"
                                placeholder="Direccion"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                key={form.telefono}
                                type="text"
                                placeholder="Telefono"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                key={form.mail}
                                type="text"
                                placeholder="Mail"
                                name="mail"
                                value={form.mail}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Fecha de Ingreso</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Ingreso"
                                name="fechaIngreso"
                                value={newDateN}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="carreraId"
                                value={form.carreraId}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carera-0`} value={0}>Seleccione...</option>
                                {carreras.carreras.map(x => <option key={`option-carera-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="ciudadId"
                                value={form.ciudadId}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-ciudad-0`} value={0}>Seleccione...</option>
                                {ciudades.ciudades.map(x => <option key={`option-ciudad-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Extension</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="extensionId"
                                value={form.extensionId}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-extension-0`} value={0}>Seleccione...</option>
                                {extensiones.extensiones.map(x => <option key={`option-extension-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control
                                key={form.codigoPostal}
                                type="text"
                                placeholder="Codigo Postal"
                                name="codigoPostal"
                                value={form.codigoPostal}
                                onChange={handleChange}
                                //onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={props.onClosedModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditAlumno;