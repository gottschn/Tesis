import { useContext } from 'react';
import PagoCuotaContext from '../../../context/pagoCuota/PagoCuotaContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import React from 'react'; 
import { PagoCuotaProps } from '../../../@redux/PagoCuota/types';
import moment from 'moment';
const PagoCuotaItem:React.FC<{pagoCuotas:PagoCuotaProps}> = ({...props}) => {
    const NewDate = moment(props.pagoCuotas.fechaPago).format('DD-MM-YYYY')
    return (
        <>
            <tr>
                <td> {props.pagoCuotas.monto} </td>
                <td> {props.pagoCuotas.porcPago}% </td>
                <td> {NewDate} </td>
                <td className="text-center">
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                           
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default PagoCuotaItem;