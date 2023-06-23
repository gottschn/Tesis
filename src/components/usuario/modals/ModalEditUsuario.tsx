import React from 'react';
import { useState, useEffect } from "react";
import { HelperRedux } from "../../../@redux";
import { UsuarioProps } from '../../../@redux/usuario/types';
import { Actions } from '../../../@redux/usuario/actions';

import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { updateUsuarios } from '../../../domain/usuarios';

const ModalEditUsuario:React.FC<{usuario:UsuarioProps}> = ({...props}) => {
    
    const [form, setForm] = useState<UsuarioProps>({
        id: props.usuario.id,
        nombre: props.usuario.nombre,
        password: props.usuario.password,
        rol: props.usuario.rol,
        personaId: props.usuario.personaId
      });
      const { nombre,password,rol } = form;

    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setForm(form);
    }, []);

    const handleOpenModalEdit = () => {
        setShowModal(true);
      };
    
      const handleCloseModalEdit = () => {
        setShowModal(false);
      };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        if (nombre === '') {
          setErrorMsg('Todos los campos son obligatorios');
          return;
        }
        setErrorMsg(null);
        //dispatch(Actions.updateCarreras());
        updateUsuarios(form.id,form.nombre, form.password, form.rol, form.personaId).then(() => {
            dispatch(Actions.updateUsuarios({...form}, form.id))
        })
        .catch(error => console.log(error))
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
                        Editar Ciudad
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del Usuario"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
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

export default ModalEditUsuario;