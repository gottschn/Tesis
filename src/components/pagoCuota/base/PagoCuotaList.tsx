import { useEffect, useState } from 'react';

import { Table } from "react-bootstrap";
import PagoCuotaItem from './PagoCuotaItem';
import React from 'react';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/PagoCuota';
import { getPagoCuotas } from '../../../domain/pagoCuotas';
import ModalAddPagoCuota from '../modals/ModalAddPagoCuota';

const PagoCuotaList = () => {
    const dispatch = HelperRedux.useDispatch()
    const { pagoCuotas } = HelperRedux.useSelector((state) => state.pagoCuotas)
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  /*   const { getPagosCuotaByCuotaId, pagosCuota } = useContext(PagoCuotaContext);
    const { currentCuota } = useContext(CuotaContext); */

    useEffect(() => {
        if(pagoCuotas.length === 0)
            getInitial();
    }, [])
    
    const getInitial = () => {
        getPagoCuotas().then(x => {dispatch(Actions.setPagoCuotasStore(x.data.value))})
        
    }

    return (
        <>
        <div className="row">
                <div className="col-6">
                    <h3>Pago de Cuotas</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddPagoCuota /> 
                </div>
        </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Monto</th>
                        <th>Porc. Pago</th>
                        <th>Fecha</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pagoCuotas && pagoCuotas.length > 0 ?
                        pagoCuotas.map((pagoCuota, index) =>
                                <PagoCuotaItem
                                 pagoCuotas={pagoCuota}
                                    key={index}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={5} className="text-center">
                                    La Cuota seleccionada no posee Pagos realizados
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default PagoCuotaList;