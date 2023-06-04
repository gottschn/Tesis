import React from 'react';
import { PrecioCuotaProps } from '../../../@redux/precioCuotas/types';
import moment from 'moment';

const HistoryPrecioCuoItem:React.FC<{precioCuotas:PrecioCuotaProps}> = ({...props}) => {
 const Date = moment(props.precioCuotas.fecha).format('DD-MM-YYYY');
    return (
      <>
        <tr>
          <th> {props.precioCuotas.id}</th>
          <td> {props.precioCuotas.carrera} </td>
          <td> ${props.precioCuotas.monto} </td>
          <td> {Date} </td>
          
        </tr>

      </>
    );
};

export default HistoryPrecioCuoItem;