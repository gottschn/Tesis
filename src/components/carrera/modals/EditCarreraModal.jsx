import { useContext, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import CarrerasContext from '../../../context/carrera/CarrerasContext';
import React from 'react';

const EditCarreraModal = ({ show, onHide }) => {
    const { currentCarrera, updateCarrera } = useContext(CarrerasContext);

    const initialFormValues = {
        descripcion: '',
        cantCuotas: 0,
    };

    const [form, setForm] = useState(initialFormValues);
    const { descripcion, cantCuotas } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setForm(currentCarrera);
    }, [currentCarrera]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (descripcion === '' || !cantCuotas ) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        updateCarrera(form);
        onHide();
    };
    
    return (
        <>
            <Modal
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar carrera
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la carrera"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad Cuotas</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cantidad de cuotas"
                                name="cantCuotas"
                                value={cantCuotas}
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
                        <Button variant="danger" onClick={onHide}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default EditCarreraModal;