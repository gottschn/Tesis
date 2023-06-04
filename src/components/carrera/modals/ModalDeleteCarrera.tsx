import {  useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteCarreras } from '../../../domain/carreras';
import { CarrerasProps } from '../../../@redux/carreras/types';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../@redux/carreras';

const ModalDeleteCarrera:React.FC<{carrera:CarrerasProps}> = ({...props}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleOpenDeleteModal = () => {
        setShowModal(true);
      };

      const handleCloseDeleteModal = () => {
        setShowModal(false);
      };

      const handleConfirmDeleteModal = () => {
        deleteCarreras(props.carrera.id).then(() => {
            dispatch(Actions.deleteCarreras(props.carrera))
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

export default ModalDeleteCarrera;