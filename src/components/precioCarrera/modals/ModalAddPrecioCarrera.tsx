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
import moment from 'moment';
import Swal from 'sweetalert2';
const ModalAddPrecioCarrera = () => {

    const [form, setForm] = useState<PrecioCarreraProps>({
        id: 0,
        monto: 0,
        matricula: 0,
        fecha: new Date(),
        carreraId: 0,
    });

    const dispatch = HelperRedux.useDispatch()
    const { precioCarrera, carreras } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
         setForm({
            id: 0,
            monto: 0,
            matricula: 0,
            fecha: new Date(),
            carreraId: 0,
        }) 
    }


    useEffect(() => {

        const precioCarrerasModal = precioCarrera.precioCarreras.find((x) => x.id)
        if (precioCarrerasModal) setForm(precioCarrerasModal)

    }, [])

    React.useEffect(() => {
        const onError = () => alert('Se produjo un error.')

        getCarreras().then(x => {
            dispatch(ActionsCarrera.setCarrerasStore(x.data.value))
        })
            .catch(onError)

    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'carrerasId') {
            setForm({
                ...form,
                [name]: parseInt(value),
            });
            return
        }
        if (name === 'fecha') {
            setForm({
                ...form,
                [name]: moment(value, 'YYYY-MM-DD').toDate()
            });
            return
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!form.monto) {
            setErrorMsg("Todos los campos son obligatorios");
            return;
          }
        setErrorMsg(null);

        createPrecioCarreras(form.monto, form.matricula, form.fecha, form.carreraId).then((x) => {
            dispatch(Actions.createPrecioCarreras({
                ...form,
                id: x.data.value
            }));
            Swal.fire({
                icon: 'success',
                text: 'El Precio de la Carrera se registro con exito.',
                showConfirmButton: false,
                timer: 1500, 
              }).then(() => {
                window.location.reload()
              })
        })
            .catch(error => {
                console.log(error)
            })
            .finally(() => handlerClearFilter() )
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
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle title">
                    <Modal.Title>Agregar Precio Carrera</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio de la Carrera</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="monto"
                                name="monto"
                                value={form.monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Matricula</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Matricula"
                                name="matricula"
                                value={form.matricula}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha"
                                name="fecha"
                                value={moment(form.fecha).format('YYYY-MM-DD')}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as={'select'}
                                name="carreraId"
                                value={form.carreraId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carrera-0`} value={0}>Seleccione...</option>
                                {carreras.carreras.map(x => <option key={`option-carrera-${x.id}`} value={x.id}>{`Codigo:${x.id} - Carrera:${x.descripcion}`}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <div>{errorMsg && <p className="error">{errorMsg}</p>}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" type="submit">
                            Agregar
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