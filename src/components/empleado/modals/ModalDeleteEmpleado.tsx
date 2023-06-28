import {  useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AlumnoProps } from '../../../@redux/alumno/types';
import { deleteAlumno } from '../../../domain/alumnos';
import { Actions } from '../../../@redux/alumno';

const ModalDeleteEmpleado:React.FC<{alumno:AlumnoProps}> = ({...props}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleOpenDeleteModal = () => {
        setShowModal(true);
      };

      const handleCloseDeleteModal = () => {
        setShowModal(false);
      };

      const handleConfirmDeleteModal = () => {
        deleteAlumno(props.alumno.id).then(() => {
            dispatch(Actions.deleteAlumnos(props.alumno))
        })
        .catch(error => console.log(error))
        .finally(() => handleCloseDeleteModal())
      };

    return (
        <>
             <Button  /* Boton de eliminar */
                  variant="danger"
                  onClick={() => {
                    handleOpenDeleteModal()
               }}
             >
             <FontAwesomeIcon icon={faTrash} />
             </Button>
            <Modal
                show = {showModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modaltitle'>
                    <Modal.Title>
                        ¿Está seguro de eliminar este registro?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>El registro será borrado de forma permanente.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDeleteModal}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteEmpleado;