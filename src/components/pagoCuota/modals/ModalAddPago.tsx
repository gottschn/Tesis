import React, { useEffect, useState } from 'react'

import { Form, Modal } from 'react-bootstrap';

import { PagosProps } from "../../../@redux/Pagos/types";
import { HelperRedux } from "../../../@redux";
import { getAlumnos } from "../../../domain/alumnos";
import { Actions as ActionsAlumno } from "../../../@redux/alumno";
import { Actions as ActionsPago } from "../../../@redux/Pagos";
import { createPagos } from "../../../domain/pagos";

import PaidIcon from '@mui/icons-material/Paid';
import { Button } from "@mui/material";
import moment from "moment";

const ModalAddPago = () => {
    const dispatch = HelperRedux.useDispatch()
    const [form, setForm] = useState<PagosProps>({
        id: 0,
        legajo: '',
        monto: 0,
        cantCuota: 0,
        nroRecibo: 0,
        fechaCarga: new Date(),
        fechaRecibo: new Date(),
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);

    const { alumnos } = HelperRedux.useSelector((state) => state)

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            getAlumnos()
                .then(x => dispatch(ActionsAlumno.setAlumnosStore(x.data.value)))
                .catch(() => alert('Se produjo un error en Alumnos'))
        }

    }, [showModal])

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'fechaCarga' || name === 'fechaRecibo') {
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

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
           setForm({
              id: 0,
              alumnoId: 0,
              legajo: '',
              monto: 0,
              cantCuota: 0,
              nroRecibo: 0,
              fechaCarga: new Date(),
              fechaRecibo: new Date(),
          })
          window.location.reload() 
    }



    const handleSubmit = (e: any) => {
        e.preventDefault();

        setErrorMsg(null);

        createPagos(form.legajo, form.cantCuota, form.monto, form.nroRecibo, form.fechaCarga, form.fechaRecibo).then((x) => {
            dispatch(ActionsPago.createPagos({
                ...form,
                id: x.data.value
            }));
            alert('Se Realizo el Pago Correctamente.')
        })
            .catch(error => {
                console.log('createPagos', error)

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
                                as={'select'}
                                name="legajo"
                                value={form.legajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-legajo-0`} value={0}>Seleccione...</option>
                                {alumnos.alumnos.map(x => <option key={`option-legajo-${x.id}`} value={x.legajo}>{`Legajo:${x.legajo} Nombre:${x.apynom}`}</option>)}
                            </Form.Control>
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
                            <Form.Label>Numeros de Cuotas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numeros de Cuotas"
                                name="cantCuota"
                                value={form.cantCuota}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numeros de Recibos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numeros de Recibos"
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
                                value={moment(form.fechaCarga).format('YYYY-MM-DD')}
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
                                value={moment(form.fechaRecibo).format('YYYY-MM-DD')}
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

export default ModalAddPago;