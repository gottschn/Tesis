/* import React from 'react';
import { PrecioCuotaProps } from '../../../@redux/precioCarrera/types';
import moment from 'moment';
import ModalEditPrecioCuota from '../modals/ModalEditPrecioCarrera';
import ModalDeletePrecioCuota from '../modals/ModalDeletePrecioCarrera';
import HistoryPrecioCuoModal from '../modals/HistoryPrecioCuoModal';

const PrecioCuoItem:React.FC<{precioCuotas:PrecioCuotaProps}> = ({...props}) => {
 const Date = moment(props.precioCuotas.fecha).format('DD-MM-YYYY');
    return (
      <>
        <tr>
          <th> {props.precioCuotas.id}</th>
          <td> {props.precioCuotas.carrera} </td>
          <td> ${props.precioCuotas.monto} </td>
          <td> {Date} </td> 
          <td className="text-center">
              <ModalEditPrecioCuota precioCuota={props.precioCuotas} />  
              <ModalDeletePrecioCuota precioCuota={props.precioCuotas} />
              <HistoryPrecioCuoModal precioCuota={props.precioCuotas} /> 
          </td>
        </tr>
      </>
    );
};

export default PrecioCuoItem; */