
import React  from 'react';
/* REDUX */
import { CarrerasProps} from '../../../@redux/carreras/types'
import ModalEditCarrera from '../modals/ModalEditCarrera';
import ModalDeleteCarrera from '../modals/ModalDeleteCarrera';


const CarreraItem:React.FC<{carrera:CarrerasProps}>= ({...props}) => {

    return (
        <>
            <tr>
                <td> {props.carrera.id} </td>
                <td> {props.carrera.descripcion} </td>
                <td> {props.carrera.cantCuotas} </td>
                <td> ${props.carrera.precioCuo} </td>
                <td className="text-center">
                    <ModalEditCarrera carrera={props.carrera} /> 
                    <ModalDeleteCarrera carrera={props.carrera}/> 
                </td>
            </tr>
        </>
    );
};

export default CarreraItem;