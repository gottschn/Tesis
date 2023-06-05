import {  useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../@redux/PagoCuota';
import { PagoCuotaProps } from '../../../@redux/PagoCuota/types';
import { deletePagoCuotas } from '../../../domain/pagoCuotas';

const ModalDeletePagoCuota:React.FC<{pagocuotas:PagoCuotaProps}> = ({...props}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleOpenDeleteModal = () => {
        setShowModal(true);
      };

      const handleCloseDeleteModal = () => {
        setShowModal(false);
      };

      const handleConfirmDeleteModal = () => {
        deletePagoCuotas(props.pagocuotas.id).then(() => {
            dispatch(Actions.deletePagoCuotas(props.pagocuotas))
        })
        .catch(error => console.log(error))
        .finally(() => handleCloseDeleteModal())
      };

    return (
        <>
             <Button
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

export default ModalDeletePagoCuota;