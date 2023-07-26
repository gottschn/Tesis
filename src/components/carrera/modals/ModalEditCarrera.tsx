import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/carreras";
import { updateCarreras } from "../../../domain/carreras"
import { CarrerasProps } from "../../../@redux/carreras/types";
import Swal from "sweetalert2";

const ModalEditCarrera:React.FC<{
    carrera:CarrerasProps;
    visible: boolean;
    onClosedModal: () => void;
}> = ({...props}) => {
    
    const [form, setForm] = useState<CarrerasProps>({} as CarrerasProps);

    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        setForm({
            id: props.carrera.id,
            descripcion: props.carrera.descripcion,
            cantCuotas: props.carrera.cantCuotas,
            precioCarrera: props.carrera.precioCarrera,
            fecha: props.carrera.fecha,
        });
    }, [props.carrera.id]);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        updateCarreras(form.id,form.descripcion,form.cantCuotas).then(() => {
            dispatch(Actions.updateCarreras({...form}, form.id))
            Swal.fire({
                icon: 'success',
                text: 'La carrera se modifico con exito.',
                showConfirmButton: false,
                timer: 1500, 
            })
        })
        .catch(error => console.log(error))
        .finally(() => props.onClosedModal())
      };
      
    return (
        <>
            <Modal
                show={props.visible}
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
                                value={form.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad Cuotas</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cantidad de cuotas"
                                name="cantCuotas"
                                value={form.cantCuotas}
                                onChange={handleChange}
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

export default ModalEditCarrera;