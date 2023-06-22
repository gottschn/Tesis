/* import React from 'react'; 

import { PagoCuotaProps } from '../../../@redux/PagoCuota/types';
import moment from 'moment';
import ModalEditPagoCuota from '../modals/ModalEditPagoCuota';
import ModalDeletePagoCuota from '../modals/ModalDeletePagoCuota';
const PagoCuotaItem:React.FC<{pagoCuotas:PagoCuotaProps}> = ({...props}) => {
    const NewDate = moment(props.pagoCuotas.fechaPago).format('DD-MM-YYYY')
    return (
        <>
            <tr>
                <td> {props.pagoCuotas.id} </td>
                <td> ${props.pagoCuotas.monto} </td>
                <td> {props.pagoCuotas.porcPago}% </td>
                <td> {NewDate} </td>
                <td className="text-center">
                    <ModalEditPagoCuota pagocuotas={props.pagoCuotas} />
                    <ModalDeletePagoCuota  pagocuotas={props.pagoCuotas}/>
                </td>
            </tr>
        </>
    );
};

export default PagoCuotaItem; */