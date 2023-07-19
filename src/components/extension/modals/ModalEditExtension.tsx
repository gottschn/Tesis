import React from 'react';
import { useState, useEffect } from "react";
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/extension";
import { ExtensionProps } from '../../../@redux/extension/types';
import { updateExtensiones } from '../../../domain/extensiones';
import { Modal, Form, Button } from "react-bootstrap";

const ModalEditExtension:React.FC<{
    extension:ExtensionProps;
    visible: boolean;
    onClosedModal: () => void;
}> = ({...props}) => {
    
    const [form, setForm] = useState<ExtensionProps>({} as ExtensionProps);

    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        setForm({
            id: props.extension.id,
            descripcion: props.extension.descripcion,
        });
    }, [props.extension.id]);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
 
        updateExtensiones(form.id,form.descripcion).then(() => {
            dispatch(Actions.updateExtensiones({...form}, form.id))
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

export default ModalEditExtension;