import { Modal, Button } from 'react-bootstrap';
import PrecioCuoList from '../base/PrecioCuoList';
import React from 'react';

const HistoryPrecioCuoModal = ({ show, onHide }) => {

    return (
        <>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modaltitle'>
                    <Modal.Title>
                        Historial de Precios de Cuota
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PrecioCuoList />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HistoryPrecioCuoModal;