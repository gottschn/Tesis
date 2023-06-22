import { useState } from "react";
import { Form, Modal } from 'react-bootstrap';

import React from 'react';
import { PagoCuotaProps } from "../../../@redux/PagoCuota/types";
import { HelperRedux } from "../../../@redux";
import { getAlumnos } from "../../../domain/alumnos";
import { Actions as ActionsAlumno } from "../../../@redux/alumno";
import { Actions as ActionsPago } from "../../../@redux/PagoCuota";
import { createPagoCuotas } from "../../../domain/pagoCuotas";

import PaidIcon from '@mui/icons-material/Paid';
import { Button } from "@mui/material";

const ModalAddPagoCuota = () => {
    const dispatch = HelperRedux.useDispatch()
    const [form, setForm] = useState<PagoCuotaProps>({
        id: 0,
        monto: 0,
        fechaPago: '',
        porcPago: 0,
        cuotaId: 0,
    });

    //const { monto, porcPago, fecha } = form;
    //const { monto } = form;


    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);

    const { alumnos, cuotas } = HelperRedux.useSelector((state) => state)

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
            monto: 0,
            fechaPago: '',
            porcPago: 0,
            cuotaId: 0,
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
        const { monto, cuotaId } = form;

        setErrorMsg(null);

        createPagoCuotas(monto, cuotaId).then((x) => {
            dispatch(ActionsPago.createPagoCuotas({
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
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="monto"
                                name="monto"
                                value={form.monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cuota ID</Form.Label>
                            <Form.Control
                                as={'select'}
                                name="cuotaId"
                                value={form.cuotaId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                                <option key={`option-carera-0`} value={0}>Seleccione...</option>
                                {cuotas.cuotas.map(x => <option key={`option-cuotas-${x.id}`} value={x.id}>{`Cuota ID: ${x.id}`}</option>)}
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

export default ModalAddPagoCuota;