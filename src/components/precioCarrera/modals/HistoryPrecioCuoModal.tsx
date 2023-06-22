import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PrecioCarreraProps } from '../../../@redux/precioCarrera/types';
import HistoryPrecioCuoList from '../base/HistoryPrecioCuoList';


const HistoryPrecioCuoModal:React.FC<{precioCuota:PrecioCarreraProps}> = ({...props}) => {

    const [showModal, setShowModal] = useState(false);
	  //const Date = moment(props.precioCuota.fecha).format('DD-MM-YYYY');
    const handleOpenModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

    return (
      <>
        <Button
         variant="success"
          onClick={handleOpenModal}
        >
          <FontAwesomeIcon icon={faEye} />
          
        </Button>
        <Modal
          size= "lg"
          show={showModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="modaltitle">
            <Modal.Title>Historial de Precios de Cuota</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ backgroundColor: 'lightgray', padding: '20px' }}>
                <HistoryPrecioCuoList />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default HistoryPrecioCuoModal;