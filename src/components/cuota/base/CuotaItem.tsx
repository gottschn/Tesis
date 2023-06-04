/* import { useContext } from 'react';
import CuotaContext from '../../../context/cuota/CuotaContext'; */
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { CuotaProps } from '../../../@redux/cuotas/types';
const CuotaItem:React.FC<{cuotas:CuotaProps}> = ({...props}) => {

    console.log('render cuota', props.cuotas)
    return (
        <>
            <tr>
                <td> {props.cuotas.numero} </td>
                <td> {`${props.cuotas.alumnoId} - ${props.cuotas?.alumno?.nombre} ${props.cuotas?.alumno?.apellido}`} </td>
                <td> {props.cuotas.precioCuotaId} -  </td>
                <td className="text-center">
                    <Button
                        variant="primary"
                        className='me-2'
                        onClick={() => {
                           // getCuota(cuota.id);
                           //openPagoCuotaModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                           // getCuota(cuota.id);
                            //openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            //getCuota(cuota.id);
                            //openDeleteModal();
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