import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AlumnoProps } from "../../../@redux/alumno/types";
import { updateAlumno } from "../../../domain/alumnos";
import { Actions } from "../../../@redux/alumno";
import { Actions as ActionsCarrera} from "../../../@redux/carreras";
import { getCarreras } from "../../../domain/carreras";

const ModalEditAlumno:React.FC<{alumno:AlumnoProps}> = ({...props}) => {
    const [form, setForm] = useState<AlumnoProps>({
        id: props.alumno.id,
        nombre: props.alumno.nombre,
        apellido: props.alumno.apellido,
        dni: props.alumno.dni,
        legajo: props.alumno.legajo,
        direccion: props.alumno.direccion,
        mail: props.alumno.mail,
        porcBeca: props.alumno.porcBeca,
        telefono: props.alumno.telefono,
        carrerasId: props.alumno.carrerasId,
        fechaIngreso: props.alumno.fechaIngreso,
        carreras: props.alumno.carreras,
      });
      const { id, nombre, apellido, dni, legajo, direccion, mail,porcBeca,telefono,carrerasId  } = form;

    const  dispatch = HelperRedux.useDispatch()
    const { alumnos, carreras } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const handleOpenModalEdit = () => {
        setShowModal(true);
      };
    
      const handleCloseModalEdit = () => {
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

    useEffect(() =>  {
         setForm(form);
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrorMsg(null);

        updateAlumno(
            form.id,
            form.nombre,
            form.apellido,
            form.dni,
            form.legajo,
            form.direccion,
            form.mail,
            form.porcBeca,
            form.telefono,
            form.carrerasId
            ).then(() => {
            dispatch(Actions.updateAlumnos({...form}, form.id))
        })
        .catch(error => console.log(error, "Error"))
        .finally(() => handleCloseModalEdit())
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
                        Editar carrera
                    </Modal.Title>
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
                              
                              {carreras.carreras.map(x => <option key={`option-carera-${x.id}`} value={x.id}>{x.descripcion}</option>)}
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

export default ModalEditAlumno;