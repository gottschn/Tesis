import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { PrecioCarreraProps } from "../../../@redux/precioCarrera/types";
import { updatePrecioCarreras } from "../../../domain/precioCarreras";
import { Actions } from "../../../@redux/precioCarrera";

const ModalEditPrecioCarrera:React.FC<{precioCuota:PrecioCarreraProps}> = ({...props}) => {
    let DateNew = new Date();
    const [form, setForm] = useState<PrecioCarreraProps>({
        id: props.precioCuota.id,
        monto: props.precioCuota.monto,
        matricula: props.precioCuota.matricula,
        fecha: props.precioCuota.fecha,
        carreraId: props.precioCuota.carreraId,
    });
    const { id, monto , carreraId } = form;
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
        if (monto === 0 || !carreraId) {
          setErrorMsg('Todos los campos son obligatorios');
          return;
        }
       
        setErrorMsg(null);
        updatePrecioCarreras(form.id, form.monto, form.matricula, DateNew, form.carreraId).then((x) => {
          dispatch(Actions.updatePrecioCarreras({...form}, form.id));
        })
        
        .catch(error => {console.log(error)})
        .finally(() => {handleCloseModalEdit()})
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
                        Editar Precio Cuota
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="id"
                                placeholder="id"
                                name="id"
                                value={id}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio Cuota</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Monto"
                                name="monto"
                                value={monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Carrera"
                                name="carreraId"
                                value={carreraId}
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

export default ModalEditPrecioCarrera;