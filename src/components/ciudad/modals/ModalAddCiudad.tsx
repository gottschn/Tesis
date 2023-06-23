import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../../../css/entities/carrera/carrera.css';
import { HelperRedux } from '../../../@redux';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { CiudadesProps } from '../../../@redux/ciudad/types';
import { Actions } from '../../../@redux/ciudad/actions';
import { createCiudades } from '../../../domain/ciudades';

const ModalAddCiudad = () => {

    const [form, setForm] = useState<CiudadesProps>({
        id: 0,
        descripcion: '',
    });
    const { descripcion } = form;

    const dispatch = HelperRedux.useDispatch()
    const { ciudades } = HelperRedux.useSelector((state) => state.ciudades)
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

        const carrerasModal = ciudades.find((x) => x.id)
        if (carrerasModal) setForm(carrerasModal)

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

        createCiudades(descripcion).then((x) => {
            dispatch(Actions.createCiudades({
                ...form,
                id: x.data.value
            }));
            alert('Se Registro la Ciudad con Exito.')
        })
            .catch(error => {
                console.log('createCiudades', error)

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
                <span>Agregar Ciudad</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Ciudad</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre De la Ciudad </Form.Label>
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

export default ModalAddCiudad;