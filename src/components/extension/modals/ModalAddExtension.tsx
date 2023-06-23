import React, { useState, useEffect } from 'react';
import { HelperRedux } from '../../../@redux';
import { ExtensionProps } from '../../../@redux/extension/types';
import { Actions } from '../../../@redux/extension';

import { Modal, Form } from 'react-bootstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import '../../../css/entities/carrera/carrera.css';
import { createExtensiones } from '../../../domain/extensiones';

const ModalAddExtension = () => {

    const [form, setForm] = useState<ExtensionProps>({
        id: 0,
        descripcion: '',
    });
    const { descripcion } = form;

    const dispatch = HelperRedux.useDispatch()
    const { extensiones } = HelperRedux.useSelector((state) => state.extensiones)
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

        const extensionesModal = extensiones.find((x) => x.id)
        if (extensionesModal) setForm(extensionesModal)

    }, [])

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
        setForm({
            id: 0,
            descripcion: '',
        })
        window.location.reload()
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
        const { descripcion} = form;

        setErrorMsg(null);

        createExtensiones(descripcion).then((x) => {
            dispatch(Actions.createExtensiones({
                ...form,
                id: x.data.value
            }));
            alert('Se Registro la Extension con Exito.')
        })
            .catch(error => {
                console.log('createExtensiones', error)

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
                <span>Agregar Extension</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Extension</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre De la Extension </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="descripcion"
                                value={descripcion}
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

export default ModalAddExtension;