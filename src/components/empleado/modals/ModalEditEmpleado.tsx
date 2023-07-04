import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { updateEmpleado } from '../../../domain/empleados';
import { EmpleadosProps } from '../../../@redux/empleado/types';

import { Actions as ActionsExtensiones } from '../../../@redux/extension';
import { Actions as ActionsCiudades } from '../../../@redux/ciudad';
import { Actions } from "../../../@redux/empleado/actions";
import { getCiudades } from "../../../domain/ciudades";
import { getExtensiones } from "../../../domain/extensiones";
import moment from "moment";

const ModalEditEmpleado: React.FC<{ empleado: EmpleadosProps }> = ({ ...props }) => {

    const [form, setForm] = useState<EmpleadosProps>({
        id: props.empleado.id,
        apynom: props.empleado.apynom,
        tipoDoc: props.empleado.tipoDoc,
        nroDoc: props.empleado.nroDoc,
        fechaNacimiento: props.empleado.fechaNacimiento,
        direccion: props.empleado.direccion,
        telefono: props.empleado.telefono,
        mail: props.empleado.mail,
        extensionId: props.empleado.extensionId,
        extension: props.empleado.extension,
        ciudadId: props.empleado.ciudadId,
        ciudad: props.empleado.ciudad,
        codigoPostal: props.empleado.codigoPostal,
        areaTrabajo: props.empleado.areaTrabajo,
    });
    const { id,apynom,tipoDoc,nroDoc,fechaNacimiento,direccion,telefono,mail,
        extensionId,ciudadId,codigoPostal,areaTrabajo} = form;

    const dispatch = HelperRedux.useDispatch()
    const {  extensiones, ciudades } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const handleOpenModalEdit = () => {
        setShowModal(true);
    };

    const handleCloseModalEdit = () => {
        setShowModal(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'carrerasId') {
            setForm({
                ...form,
                [name]: [parseInt(value)],
            });
            return
        }
        setForm({
            ...form,
            [name]: value,
        });
    };

    useEffect(() => {
        if (showModal) {
            getCiudades()
                .then(x => dispatch(ActionsCiudades.setCiudadesStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }

        if (showModal) {
            getExtensiones()
                .then(x => dispatch(ActionsExtensiones.setExtensionesStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }
    }, [showModal])

    useEffect(() => {
        setForm(form);
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrorMsg(null);

        updateEmpleado(
            form.id,
            form.apynom,
            form.tipoDoc,
            form.nroDoc,
            form.fechaNacimiento,
            form.direccion,
            form.telefono,
            form.mail,
            form.extensionId,
            form.extension,
            form.ciudadId,
            form.ciudad,
            form.codigoPostal,
            form.areaTrabajo
        ).then(() => {
            dispatch(Actions.updateEmpleados({ ...form }, form.id))
        })
            .catch(error => console.log(error, "Error"))
            .finally(() => handleCloseModalEdit())
    };

    return (
        <>
            <Button
                variant="warning"
                className='me-2'
                onClick={() => {
                    handleOpenModalEdit()
                }}
            >
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar Empleado
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3">
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre y Apellido"
                                name="apynom"
                                value={apynom}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tipo de Documento"
                                name="tipoDoc"
                                value={tipoDoc}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numero de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero de Documento"
                                name="nroDoc"
                                value={nroDoc}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Nacimiento"
                                name="fechaNacimiento"
                                value={moment(fechaNacimiento).format('YYYY-MM-DD')}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Direccion"
                                name="direccion"
                                value={direccion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefono"
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mail"
                                name="mail"
                                value={mail}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Extension</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="extensionId"
                                value={extensionId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carera-0`} value={0}>Seleccione...</option>
                                {extensiones.extensiones.map(x => <option key={`option-extensiones-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="ciudadId"
                                value={ciudadId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carera-0`} value={0}>Seleccione...</option>
                                {ciudades.ciudades.map(x => <option key={`option-ciudades-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Codigo Postal"
                                name="codigoPostal"
                                value={codigoPostal}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Area de Trabajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Area de Trabajo"
                                name="areaTrabajo"
                                value={areaTrabajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
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
                        <Button variant="danger" onClick={handleCloseModalEdit}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditEmpleado;