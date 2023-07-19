import React from 'react';
import { useState, useEffect } from "react";
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/ciudad";
import { CiudadesProps } from "../../../@redux/ciudad/types";
import { updateCiudades } from "../../../domain/ciudades";
import { Modal, Form, Button } from "react-bootstrap";


const ModalEditCiudad:React.FC<{
    ciudad:CiudadesProps;
    visible: boolean;
    onClosedModal: () => void;
}> = ({...props}) => {
    
    const [form, setForm] = useState<CiudadesProps>({} as CiudadesProps);

    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        setForm({
            id: props.ciudad.id,
            descripcion: props.ciudad.descripcion,
        });
    }, [props.ciudad.id]);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrorMsg(null);

        updateCiudades(form.id,form.descripcion).then(() => {
            dispatch(Actions.updateCiudades({...form}, form.id))
            alert('La Ciudad se Modifico con Exito.');
        })
        .catch(error => console.log(error))
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
                        Editar Ciudad
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Ciudad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la carrera"
                                name="descripcion"
                                value={form.descripcion}
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
                        <Button variant="danger" onClick={props.onClosedModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditCiudad;