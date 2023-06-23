import React from 'react';
import { useState, useEffect } from "react";
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/extension";
import { ExtensionProps } from '../../../@redux/extension/types';
import { updateExtensiones } from '../../../domain/extensiones';


import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ModalEditExtension:React.FC<{extension:ExtensionProps}> = ({...props}) => {
    
    const [form, setForm] = useState<ExtensionProps>({
        id: props.extension.id,
        descripcion: props.extension.descripcion,
      });
      const { descripcion } = form;

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
    
        if (descripcion === '') {
          setErrorMsg('Todos los campos son obligatorios');
          return;
        }
        setErrorMsg(null);
        //dispatch(Actions.updateCarreras());
        updateExtensiones(form.id,form.descripcion).then(() => {
            dispatch(Actions.updateExtensiones({...form}, form.id))
        })
        .catch(error => console.log(error))
        .finally(() => handleCloseModalEdit())
      };
      
    return (
        <>
             <Button /* Boton de mod */
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
                        Editar Extension
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Extension</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la Extension"
                                name="descripcion"
                                value={descripcion}
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

export default ModalEditExtension;