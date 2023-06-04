import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/carreras";
import { updateCarreras } from "../../../domain/carreras"
import { CarrerasProps } from "../../../@redux/carreras/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ModalEditCarrera:React.FC<{carrera:CarrerasProps}> = ({...props}) => {
    
    const [form, setForm] = useState<CarrerasProps>({
        id: props.carrera.id,
        descripcion: props.carrera.descripcion,
        cantCuotas: props.carrera.cantCuotas,
        precioCuo: props.carrera.precioCuo,
      });
      const { descripcion, cantCuotas } = form;

    const  dispatch = HelperRedux.useDispatch()
    //const { carreras } = HelperRedux.useSelector((state) => state.carreras)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setForm(form);
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
    
        if (descripcion === '' || !cantCuotas) {
          setErrorMsg('Todos los campos son obligatorios');
          return;
        }
        setErrorMsg(null);
        //dispatch(Actions.updateCarreras());
        updateCarreras(form.id,form.descripcion,form.cantCuotas).then(() => {
            dispatch(Actions.updateCarreras({...form}, form.id))
        })
        .catch(error => console.log(error))
        .finally(() => handleCloseModalEdit())
      };
      
    return (
        <>
             <Button /* Boton de mod */
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
                                placeholder="Nombre de la carrera"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad Cuotas</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cantidad de cuotas"
                                name="cantCuotas"
                                value={cantCuotas}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
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

export default ModalEditCarrera;