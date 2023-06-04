import { useEffect, useState } from 'react';

import { Table } from "react-bootstrap";
import PagoCuotaItem from './PagoCuotaItem';
import EditPagoCuotaModal from '../modals/EditPagoCuotaModal';
import DeletePagoCuotaModal from '../modals/DeletePagoCuotaModal';
import React from 'react';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/PagoCuota';
import { getPagoCuotas } from '../../../domain/pagoCuotas';

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
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
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

            <EditPagoCuotaModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
            />

            <DeletePagoCuotaModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default PagoCuotaList;