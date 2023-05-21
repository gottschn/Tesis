import { useContext } from 'react';
import CuotaContext from '../../../context/cuota/CuotaContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
const CuotaItem = ({ cuota, index, openPagoCuotaModal, openEditModal, openDeleteModal }) => {

    const { getCuota } = useContext(CuotaContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {cuota.numero} </td>
                <td> {cuota.estadoCuo} </td>
                <td> {cuota.fecha} </td>
                <td className="text-center">
                    <Button
                        variant="primary"
                        className='me-2'
                        onClick={() => {
                            getCuota(cuota.id);
                            openPagoCuotaModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                            getCuota(cuota.id);
                            openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getCuota(cuota.id);
                            openDeleteModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default CuotaItem;