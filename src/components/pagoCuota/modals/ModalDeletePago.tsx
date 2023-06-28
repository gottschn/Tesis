import {  useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../@redux/Pagos';
import { PagosProps } from '../../../@redux/Pagos/types';
import { deletePagos } from '../../../domain/pagos';


const ModalDeletePagoCuota:React.FC<{pago:PagosProps}> = ({...props}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleOpenDeleteModal = () => {
        setShowModal(true);
      };

      const handleCloseDeleteModal = () => {
        setShowModal(false);
      };

      const handleConfirmDeleteModal = () => {
        deletePagos(props.pago.id).then(() => {
            dispatch(Actions.deletePagos(props.pago))
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