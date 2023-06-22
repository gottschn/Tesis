import React from 'react';
import { PrecioCarreraProps } from '../../../@redux/precioCarrera/types';
import moment from 'moment';

const HistoryPrecioCuoItem:React.FC<{precioCarreras:PrecioCarreraProps}> = ({...props}) => {
 const Date = moment(props.precioCarreras.fecha).format('DD-MM-YYYY');
    return (
      <>
        <tr>
          <th> {props.precioCarreras.id}</th>
          <td> {props.precioCarreras.carrera} </td>
          <td> ${props.precioCarreras.monto} </td>
          <td> {Date} </td>
          
        </tr>

      </>
    );
};

export default HistoryPrecioCuoItem;