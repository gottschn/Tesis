import {  useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import React from 'react';
import { PagoCuotaProps } from '../../../@redux/PagoCuota/types';
import { HelperRedux } from '../../../@redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { updatePagoCuotas } from '../../../domain/pagoCuotas';
import { Actions } from '../../../@redux/PagoCuota';
import { Actions as ActionsCuotas } from '../../../@redux/cuotas';
import { getCuotas } from '../../../domain/cuotas';

const ModalEditPagoCuota:React.FC<{pagocuotas:PagoCuotaProps}> = ({...props}) => {

    const [form, setForm] = useState<PagoCuotaProps>({
    id: props.pagocuotas.id,
    monto: props.pagocuotas.monto,
    fechaPago: props.pagocuotas.fechaPago,
    porcPago: props.pagocuotas.porcPago,
    cuotaId: props.pagocuotas.cuotaId,
  });

    const { id, monto , cuotaId } = form;
    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { cuotas  } = HelperRedux.useSelector((state) => state)

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
      updatePagoCuotas(form.id, form.monto,form.cuotaId).then((x) => {
        dispatch(Actions.updatePagoCuotas({...form}, form.id));
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
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Monto abonado"
                                name="monto"
                                value={monto}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                         <Form.Label>Alumno</Form.Label>
                        <Form.Control
                        as={'select'}
                        name="cuotaId"
                        value={form.cuotaId}
                        onChange={handleChange}
                        onFocus={() => setErrorMsg(null)}
                        >
                        <option key={`option-carera-0`} value={0}>Seleccione...</option>
                        {cuotas.cuotas.map(x => <option key={`option-alumno-${x.id}`} value={x.id}>{`Cuota ID: ${x.id}`}</option>)}
                        </Form.Control>
                   </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
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

export default ModalEditPagoCuota;