import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '../../../css/entities/carrera/carrera.css';

import { CuotaProps } from '../../../@redux/cuotas/types';
import { AlumnoProps } from '../../../@redux/alumno/types';

import { createCuotas } from '../../../domain/cuotas';
import { getAlumnos } from '../../../domain/alumnos';

import { Actions } from '../../../@redux/cuotas';
import { Actions as ActionsAlumno } from '../../../@redux/alumno'
import { Actions as ActionsPrecioCuota } from '../../../@redux/precioCarrera';
import { getPrecioCarreras } from '../../../domain/precioCarreras';

const ModalAddCuota = () => {
  const dispatch = HelperRedux.useDispatch()
  const [form, setForm] = useState<CuotaProps>({
    id: 0,
    numero: 0,
    alumnoId: 0,
    precioCuotaId: 0,
    monto: 0
  });
  
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);
    
    const { alumnos, precioCarrera } = HelperRedux.useSelector((state) => state)
  
    React.useEffect(() => {
        const onError = () => alert('Se produjo un erorr.')
        getAlumnos().then(x => {
            dispatch(ActionsAlumno.setAlumnosStore(x.data.value))
        })
        .catch(onError)

        getPrecioCarreras().then(x => {
            dispatch(ActionsPrecioCuota.setPrecioCarrerasStore(x.data.value))
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
        numero: 0,
        alumnoId: 0,
        precioCuotaId: 0,
        monto: 0
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
        const { numero, alumnoId , precioCuotaId } = form;
        
        setErrorMsg(null);

        createCuotas(numero, alumnoId, precioCuotaId).then((x) => {
            dispatch(Actions.createCuotas({
                ...form, 
                id: x.data.value
            }));
        })
        .catch(error => {
            console.log('createCuotas', error)
            alert('Se produjo un error.')
        })
        .finally(() => handlerClearFilter())
    };

    return (
    <>
       <Button
          variant="success"
         onClick={(handleOpenModal)}
        >
        <FontAwesomeIcon icon={faAdd} />
         <span>Agregar Cuota </span>              
       </Button>

      <Modal
        show = {showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
            <Modal.Title>Agregar Cuota</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Numero de la Cuota</Form.Label>
              <Form.Control
                type="number"
                placeholder="numero"
                name="numero"
                value={form.numero}
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
                    {alumnos.alumnos.map(x => <option key={`option-alumno-${x.id}`} value={x.id}>{`${x.nombre} ${x.apellido}`}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio Cuota</Form.Label>
                <Form.Control
                    as={'select'}
                    name="precioCuotaId"
                    value={form.precioCuotaId}
                    onChange={handleChange}
                    onFocus={() => setErrorMsg(null)}
                >
                    <option key={`option-precio-cuota-0`} value={0}>Seleccione...</option>
                    {precioCarrera.precioCarreras.map(x => <option key={`option-precio-cuto-${x.id}`} value={x.id}>{`${x.id} - ${x.monto} $`}</option>)}
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

export default ModalAddCuota;