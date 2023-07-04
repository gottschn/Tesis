import React from 'react'
import { ModalProps } from './types';
import { Button, Form, Modal as ModalDefault } from 'react-bootstrap';

const Modal: React.FC<ModalProps> = ({ onClosed = () => ({}), ...props }) => {

    return (
        <ModalDefault
            show={props.visible}
        >
            <>
                <ModalDefault.Header className="modaltitle">
                    <ModalDefault.Title>
                        {props.title} <p> Prueba Title</p>
                    </ModalDefault.Title>
                </ModalDefault.Header>

                <ModalDefault.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>{props.children}</Form.Label>
                        <Form.Control
                            placeholder=""
                            name="{props.children}"
                        />
                    </Form.Group>
                </ModalDefault.Body>

                <ModalDefault.Footer>
                    <Button variant="success" type="submit">
                        Guardar
                    </Button>
                    <Button variant="danger">
                        Cancelar
                    </Button>
                </ModalDefault.Footer>
            </>
        </ModalDefault>
    )
}

export default Modal;