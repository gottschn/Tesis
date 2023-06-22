import React, { } from 'react';
import { CuotaProps } from '../../../@redux/cuotas/types';
import { HelperRedux } from '../../../@redux';
import ModalEditCuota from '../modals/ModalEditCuota';
import ModalDeleteCuota from '../modals/ModalDeleteCuota';
const CuotaItem:React.FC<{cuotas:CuotaProps}> = ({...props}) => {

    const { precioCarreras } = HelperRedux.useSelector((state) => state.precioCarrera)
    const precioCuotaActual = precioCarreras.find((precioCarrera) => precioCarrera.id === props.cuotas.precioCuotaId);
    const monto = precioCuotaActual ? precioCuotaActual.monto : "";

    console.log(monto,"a")
    return (
        <>
            <tr>
                <td> {props.cuotas.numero} </td>
                <td> {`${props.cuotas.alumnoId} - ${props.cuotas?.alumno?.nombre} ${props.cuotas?.alumno?.apellido}`} </td>
                <td>{`ID:${props.cuotas.precioCuotaId} $:${monto}`}</td>
                <td className="text-center">
                        <ModalEditCuota cuota={props.cuotas}/>
                        <ModalDeleteCuota cuota={props.cuotas} />
                </td>
            </tr>
        </>
    );
};

export default CuotaItem;