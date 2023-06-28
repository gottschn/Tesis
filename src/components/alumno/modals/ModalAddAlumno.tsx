import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';
import { getCarreras } from '../../../domain/carreras';
import { getCiudades } from '../../../domain/ciudades';
import { getExtensiones } from '../../../domain/extensiones';

import { Actions } from '../../../@redux/alumno';
import { createAlumno } from '../../../domain/alumnos';


import { AlumnoProps } from '../../../@redux/alumno/types';
import { Actions as ActionsCarrera } from '../../../@redux/carreras';
import { Actions as ActionsCiudad } from '../../../@redux/ciudad';
import { Actions as ActionsExtension } from '../../../@redux/extension';

import '../../../css/entities/carrera/carrera.css';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import moment from 'moment';

const ModalAddAlumno = () => {

    const [form, setForm] = useState<AlumnoProps>({
        id: 0,
        apynom: '',
        legajo: '',
        tipoDoc: 0,
        nroDoc: '',
        carrerasId: [],
        carreras: [],
        pagos: [],
        fechaNacimiento: new Date(),
        fechaIngreso: new Date(),
        direccion: '',
        telefono: '',
        mail: '',
        extensionId: 0,
        extension: '',
        ciudadId: 0,
        ciudad: '',
        codigoPostal: 0
    });

    const dispatch = HelperRedux.useDispatch()
    const { alumnos, carreras, ciudades, extensiones } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
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
        if (name === 'ciudadId') {
            setForm({
                ...form,
                [name]: [parseInt(value)],
            });
            return
        }
        if (name === 'extensionId') {
            setForm({
                ...form,
                [name]: [parseInt(value)],
            });
            return
        }

        if (name === 'fechaIngreso' || name === 'fechaNacimiento') {
            setForm({
                ...form,
                [name]: [moment(value, 'YYYY-MM-DD').toDate()],
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
            getCarreras()
                .then(x => dispatch(ActionsCarrera.setCarrerasStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }
        if (showModal) {
            getCiudades()
                .then(x => dispatch(ActionsCiudad.setCiudadesStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }
        if (showModal) {
            getExtensiones()
                .then(x => dispatch(ActionsExtension.setExtensionesStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }
    }, [showModal])
    /*useEffect(() => {
        const AlumnosModal = alumnos.alumnos.find((x) => x.id)
        if (AlumnosModal) setForm(AlumnosModal)

    }, [])
*/
    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
        /* setForm({
            id: 0,
            nombre: '',   
        }) */
        /* window.location.reload() */
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setErrorMsg(null);

        createAlumno(form.legajo, form.apynom, form.tipoDoc, form.nroDoc, form.fechaNacimiento, form.direccion,
            form.telefono, form.mail, form.fechaIngreso, form.carrerasId, form.extensionId, form.ciudadId, form.codigoPostal).then((x) => {
                dispatch(Actions.createAlumnos({
                    ...form,
                    id: x.data.value
                }));
                alert('Se Registro el Alumno con Exito.')
            })
            .catch(error => {
                console.log('createAlumno', error)

            })
            .finally(() => handlerClearFilter())
    };
    return (
        <>
            <Button
                className='modalMargin'
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <AddCircleIcon />
                <span>Agregar Alumno</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Alumno</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Legajo"
                                name="legajo"
                                value={form.legajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre y Apellido"
                                name="apynom"
                                value={form.apynom}
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
                                value={form.tipoDoc}
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
                                value={form.nroDoc}
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
                                value={moment(form.fechaNacimiento).format('YYYY-MM-DD')}
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
                                value={form.direccion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Telefono"
                                name="telefono"
                                value={form.telefono}
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
                                value={form.mail}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Ingreso</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Ingreso"
                                name="fechaIngreso"
                                value={moment(form.fechaIngreso).format('YYYY-MM-DD')}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="carrerasId"
                                value={form.carrerasId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
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
                                onFocus={() => setErrorMsg(null)}
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
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-extension-0`} value={0}>Seleccione...</option>
                                {extensiones.extensiones.map(x => <option key={`option-extension-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Codigo Postal"
                                name="codigoPostal"
                                value={form.codigoPostal}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" type="submit">
                            Añadir
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCloseModal} >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddAlumno;