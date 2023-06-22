import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../../../css/entities/carrera/carrera.css';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/precioCarrera';
import { Actions as ActionsCarrera } from '../../../@redux/carreras';
import { getCarreras } from '../../../domain/carreras';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { PrecioCarreraProps } from '../../../@redux/precioCarrera/types';
import { createPrecioCarreras } from '../../../domain/precioCarreras';
let DateNew = new Date()
const ModalAddPrecioCarrera = () => {

    const [form, setForm] = useState<PrecioCarreraProps>({
        id: 0,
        monto: 0,
        fecha: DateNew,
        carrera: 0,
    });
    const { monto, carrera } = form;

    const { precioCarrera, carreras } = HelperRedux.useSelector((state) => state)
    const dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlerClearFilter = () => {
        setClearModal(true)
    }


    useEffect(() => {

        const precioCarrerasModal = precioCarrera.precioCarreras.find((x) => x.id)
        if (precioCarrerasModal) setForm(precioCarrerasModal)

    }, [])

    React.useEffect(() => {
        const onError = () => alert('Se produjo un erorr.')

        getCarreras().then(x => {
            dispatch(ActionsCarrera.setCarrerasStore(x.data.value))
        })
            .catch(onError)

    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (monto === 0 || !carrera) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }

        setErrorMsg(null);
        createPrecioCarreras(form.monto, DateNew, form.carrera).then((x) => {
            dispatch(Actions.createPrecioCarreras({ ...form, id: x.data.value }));
        })
            .catch(error => { console.log(error) })
            .finally(() => { handlerClearFilter() })
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
                <span>Precio Carrera</span>
            </Button>

            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Precio Cuota</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio de la Cuota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="monto"
                                name="monto"
                                value={monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as={'select'}
                                name="carrera"
                                value={form.carrera}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carrera-0`} value={0}>Seleccione...</option>
                                {carreras.carreras.map(x => <option key={`option-carrera-${x.id}`} value={x.id}>{`${x.id} - ${x.descripcion} $`}</option>)}
                            </Form.Control>
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

export default ModalAddPrecioCarrera;