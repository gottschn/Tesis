import AlumCarrList from './AlumCarrList';
import CarrDispList from './CarrDispList';
import { Modal, Button } from 'react-bootstrap';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faI } from '@fortawesome/free-solid-svg-icons';

const InscripAlumCarrModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    

    return (
      <>
       
        <Button 
            variant="primary"
            onClick={handleOpenModal}
         >
          <FontAwesomeIcon icon={faI} />
          <span>Inscripcion Alumno </span>
        </Button>
        <Modal
          show={showModal}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="modaltitle">
            <Modal.Title>Inscripción de Alumno a una Carrera</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h5>Carreras disponibles</h5>
            <CarrDispList />

            <h5>Carreras cursadas por el Alumno</h5>
            <AlumCarrList />
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

export default InscripAlumCarrModal;