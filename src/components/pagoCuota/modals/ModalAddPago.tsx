import { useState } from "react";
import { Form, Modal } from 'react-bootstrap';

import React from 'react';
import { PagosProps } from "../../../@redux/Pagos/types";
import { HelperRedux } from "../../../@redux";
import { getAlumnos } from "../../../domain/alumnos";
import { Actions as ActionsAlumno } from "../../../@redux/alumno";
import { Actions as ActionsPago } from "../../../@redux/Pagos";
import { createPagos } from "../../../domain/pagos";

import PaidIcon from '@mui/icons-material/Paid';
import { Button } from "@mui/material";

const ModalAddPago = () => {
    const dispatch = HelperRedux.useDispatch()
    const [form, setForm] = useState<PagosProps>({
        id: 0,
        legajo: '',
        cantCuota: 0,
        nroCuota: 0,
        monto: 0,
        nroRecibo: 0,
        fechaCarga: null,
        fechaRecibo: null,
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);
    

    const { alumnos, pagos } = HelperRedux.useSelector((state) => state)

    React.useEffect(() => {
        const onError = () => alert('Se produjo un erorr.')
        getAlumnos().then(x => {
            dispatch(ActionsAlumno.setAlumnosStore(x.data.value))
        })
            .catch(onError)

    }, [])

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
            legajo : '',
            cantCuota: 0,
            monto: 0,
            nroRecibo: 0,
            fechaCarga: null,
            fechaRecibo: null,
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
        const { legajo, cantCuota, monto, nroRecibo, fechaCarga, fechaRecibo } = form;

        setErrorMsg(null);

        createPagos(legajo, cantCuota, monto, nroRecibo, fechaCarga, fechaRecibo).then((x) => {
                dispatch(ActionsPago.createPagos({
                    ...form,
                    id: x.data.value
                }));
                alert('Se pago la Cuota Correspondiente.')
            })
            .catch(error => {
                console.log('createCuotas', error)

            })
            .finally(() => handlerClearFilter())
    };

    return (
        <>
            <Button
                className='modalMargin'
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <PaidIcon />
                <span>Agregar Pago</span>
            </Button>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Pagar Cuota</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Legajo"
                                name="legajo"
                                value={form.legajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad de Cuotas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cantidad de Cuotas"
                                name="cantCuota"
                                value={form.cantCuota}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Monto"
                                name="monto"
                                value={form.monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>numero de Recibo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero de Recibo"
                                name="nroRecibo"
                                value={form.nroRecibo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Carga</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Carga"
                                name="fechaCarga"
                                value={form.fechaCarga}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Recibo</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Recibo"
                                name="fechaRecibo"
                                value={form.fechaRecibo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Alumno</Form.Label>
                            <Form.Control
                                as={'select'}
                                name="alumnoId"
                                value={form.alumnoId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carera-0`} value={0}>Seleccione...</option>
                                {alumnos.alumnos.map(x => <option key={`option-cuotas-${x.id}`} value={x.id}>{`Alumno ID: ${x.id} ${x.apynom}`}</option>)}
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

export default ModalAddPago;