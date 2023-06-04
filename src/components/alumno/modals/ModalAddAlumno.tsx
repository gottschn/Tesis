import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';
import { getCarreras } from '../../../domain/carreras';

import { Actions } from '../../../@redux/alumno';
import { createAlumno } from '../../../domain/alumnos';


import { AlumnoProps } from '../../../@redux/alumno/types';
import { Actions as ActionsCarrera } from '../../../@redux/carreras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '../../../css/entities/carrera/carrera.css';

let newDate = new Date()

const ModalAddAlumno = () => {
  
  const [form, setForm] = useState<AlumnoProps>({
    id: 0,
    nombre: '',
    apellido: '',
    dni: '',
    legajo: '',
    direccion: '',
    mail: '',
    porcBeca: 0,
    telefono: '',
    carrerasId: [],
    fechaIngreso: newDate,
    carreras:[]
  });
  const { id, nombre, apellido, dni, legajo, direccion, mail, porcBeca, telefono, carrerasId } = form;

  const dispatch = HelperRedux.useDispatch()
  const { alumnos, carreras } = HelperRedux.useSelector((state) => state)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if(name === 'carrerasId'){
      setForm({
        ...form,
        [name]: [parseInt(value)],
      });
      return
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    if(showModal){
      getCarreras()
        .then(x => dispatch(ActionsCarrera.setCarrerasStore(x.data.value)))
        .catch(() => alert('Se produjo un bardo'))
    }
  }, [showModal])
  useEffect(() => {
    const AlumnosModal = alumnos.alumnos.find((x) => x.id )
    if( AlumnosModal) setForm(AlumnosModal)
    
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setErrorMsg(null);
  
    createAlumno(form.nombre, form.apellido, form.dni, form.legajo, form.direccion,
       form.mail, form.porcBeca, form.telefono,form.carrerasId, form.fechaIngreso,).then((x) => {
      dispatch(Actions.createAlumnos({...form,id:x.data.value}));
    })
    .catch(error => {console.log(error, "Error ?")})
    .finally(() => {handleCloseModal()})
  };

  return (
    <>
       <Button
          variant="success"
         onClick={(handleOpenModal)}
        >
        <FontAwesomeIcon icon={faAdd} />
         <span>Agregar Alumno </span>              
       </Button>

      <Modal
        show = {showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
          <Modal.Title>Agregar Alumno</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del alumno"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellido del alumno"
                                name="apellido"
                                value={apellido}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dni</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dni del alumno"
                                name="dni"
                                value={dni}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Legajo del alumno"
                                name="legajo"
                                value={legajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Direccion del Alumno"
                                name="direccion"
                                value={direccion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mail del alumno"
                                name="mail"
                                value={mail}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Porc. de Beca</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Porc. de Beca"
                                name="porcBeca"
                                value={porcBeca}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Telefono"
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as={'select'}
                                multiple={false}
                                name="carrerasId"
                                value={carrerasId}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            >
                              <option key={`option-carera-0`} value={0}>Seleccione...</option>
                              {carreras.carreras.map(x => <option key={`option-carera-${x.id}`} value={x.id}>{x.descripcion}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Añadir
                        </Button>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
      </Modal>
    </>
  );
};

export default ModalAddAlumno;