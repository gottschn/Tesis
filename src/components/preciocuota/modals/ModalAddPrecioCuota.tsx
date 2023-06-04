import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../css/entities/carrera/carrera.css';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/precioCuotas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { PrecioCuotaProps } from '../../../@redux/precioCuotas/types';
import { createPrecioCuotas, getPrecioCuotas } from '../../../domain/precioCuotas';
import { Actions as ActionsCarrera } from '../../../@redux/carreras';
import { getCarreras } from '../../../domain/carreras';
let DateNew = new Date()
const ModalAddPrecioCuota = () => {
  
  const [form, setForm] = useState<PrecioCuotaProps>({
    id: 0,
    monto: 0,
    fecha: DateNew,
    carrera: 0,
  });
  const { monto, carrera } = form;

  const { precioCuota, carreras } = HelperRedux.useSelector((state) => state)
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

    const precioCuotasModal = precioCuota.precioCuotas.find((x) => x.id )
    if( precioCuotasModal) setForm(precioCuotasModal)
    
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
    createPrecioCuotas(form.monto, DateNew, form.carrera).then((x) => {
      dispatch(Actions.createPrecioCuotas({...form,id:x.data.value}));
    })
    .catch(error => {console.log(error)})
    .finally(() => {handlerClearFilter()})
  };

  return (
    <>
       <Button
          variant="success"
         onClick={(handleOpenModal)}
        >
        <FontAwesomeIcon icon={faAdd} />
         <span>Agregar Precio Cuota </span>              
       </Button>

      <Modal
        show = {showModal}
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
            <Button variant="success" type="submit">
              Añadir
            </Button>
            <Button variant="danger"  onClick={handleCloseModal} >
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddPrecioCuota;