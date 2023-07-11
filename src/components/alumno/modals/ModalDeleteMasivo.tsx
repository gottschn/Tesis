import {  useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AlumnoProps } from '../../../@redux/alumno/types';
import { deleteAlumno, deleteAlumnosMassivo } from '../../../domain/alumnos';
import { Actions } from '../../../@redux/alumno';
import moment from 'moment';
import { Button } from '@mui/material';

const ModalDeleteMasivo = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
        /* setForm({
            id: 0,
            nombre: '',   
        }) */
        /* window.location.reload() */
    }
      const handleSubmit = (e: any) => {
        e.preventDefault();

        setErrorMsg(null);

       /*  deleteAlumnosMassivo(form.desde, form.hasta ).then((x) => {
                dispatch(Actions.deleteAlumnosMasivo({
                    ...form,
                    data: x.data
                }));
                alert('Se Elimino Masivamente.')
            })
            .catch(error => {
                console.log('deleteAlumnosMasivo', error)

            })
            .finally(() => handlerClearFilter()) */
    };

    return (
        <>
             <Button  /* Boton de eliminar */
                  className='modalMargin'
                  size='small'
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleOpenModal()
               }}
             >
             <FontAwesomeIcon icon={faTrash} />
             Eliminacion Masiva</Button>
             <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Eliminar Masivamente</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha Desde</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha Desde"
                                name="desde"
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha Hasta</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha Hasta"
                                name="hasta"
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" type="submit">
                            Eliminar
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

export default ModalDeleteMasivo;