import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../../../css/entities/carrera/carrera.css';
import { HelperRedux } from '../../../@redux';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { UsuarioProps } from '../../../@redux/usuario/types';
import { createUsuarios } from '../../../domain/usuarios';
import { Actions } from '../../../@redux/usuario/actions';

const ModalAddUsuario = () => {

    const [form, setForm] = useState<UsuarioProps>({
        id: 0,
        nombre: '',
        password: '',
        rol: 0,
        personaId: 0,
    });
    const { nombre, password, rol, personaId } = form;

    const dispatch = HelperRedux.useDispatch()
    const { usuarios } = HelperRedux.useSelector((state) => state.usuarios)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {

        const usuariosModal = usuarios.find((x) => x.id)
        if (usuariosModal) setForm(usuariosModal)

    }, [])

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
        setForm({
            id: 0,
            nombre: '',
            password: '',
            rol: 0,
            personaId: 0,
        })
       /*  window.location.reload() */
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { nombre, password, rol, personaId} = form;

        setErrorMsg(null);

        createUsuarios(nombre, password, rol, personaId).then((x) => {
            dispatch(Actions.createUsuarios({
                ...form,
                id: x.data.value
            }));
            alert('Se Registro el Usuario con Exito.')
        })
            .catch(error => {
                console.log('createUsuario', error)

            })
        .finally(() => handlerClearFilter())
    };

    return (
        <>
            <Button

                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <AddCircleIcon />
                <span>Agregar Usuario</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rol"
                                name="rol"
                                value={rol}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Persona ID? </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Persona ID"
                                name="personaId"
                                value={personaId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
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

export default ModalAddUsuario;