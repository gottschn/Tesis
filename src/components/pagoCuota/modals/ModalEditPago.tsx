import {  useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import React from 'react';
import { PagosProps } from '../../../@redux/Pagos/types';
import { HelperRedux } from '../../../@redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { updatePagos } from '../../../domain/pagos';
import { Actions } from '../../../@redux/Pagos';
import { Actions as ActionsCuotas } from '../../../@redux/cuotas';
import { getCuotas } from '../../../domain/cuotas';
import moment from 'moment';

const ModalEditPago:React.FC<{pago:PagosProps}> = ({...props}) => {

    const [form, setForm] = useState<PagosProps>({
    id: props.pago.id,
    legajo: props.pago.legajo,
    cantCuota: props.pago.cantCuota,
    nroCuota: props.pago.nroCuota,
    monto: props.pago.monto,
    nroRecibo: props.pago.nroRecibo,
    fechaCarga: props.pago.fechaCarga,
    fechaRecibo: props.pago.fechaRecibo,
    alumnoId: props.pago.alumnoId
  });

    /* const { legajo, cantCuota , cuotaId } = form; */
    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setForm(form);
    }, [])
    
    useEffect(() => {
        const onError = () => alert('Se produjo un erorr.')
        getCuotas().then(x => {
            dispatch(ActionsCuotas.setCuotasStore(x.data.value))
        })
        .catch(onError)
    }, []);

    const handleOpenModalEdit = () => {
    setShowModal(true);
    };
  
    const handleCloseModalEdit = () => {
    setShowModal(false);
    };

    const handleChange = (e: any) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
    });
    };

  const handleSubmit = (e: any) => {
      e.preventDefault();
     
      setErrorMsg(null);
      updatePagos(form.id, form.legajo,form.cantCuota, form.monto, form.nroRecibo, form.fechaCarga, form.fechaRecibo).then((x) => {
        dispatch(Actions.updatePagos({...form}, form.id));
      })
      
      .catch(error => {console.log(error)})
      .finally(() => {handleCloseModalEdit()})
    };

    return (
        <>
            <Button
                variant="warning"
                className='me-2'
                onClick={() => {
                handleOpenModalEdit()
             }}
                >
                <FontAwesomeIcon icon={faPen} />
             </Button>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar Pago de Cuota
                    </Modal.Title>
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
                            <Form.Label>Numero de Recibo</Form.Label>
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
                                value={moment(form.fechaCarga).format("YYYY-MM-DD")}
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
                                value={moment(form.fechaRecibo).format("YYYY-MM-DD")}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={handleCloseModalEdit}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditPago;