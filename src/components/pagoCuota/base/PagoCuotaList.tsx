import { useEffect } from 'react';

import React from 'react';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/PagoCuota';
import { getPagoCuotas } from '../../../domain/pagoCuotas';
import ModalAddPagoCuota from '../modals/ModalAddPagoCuota';
import DataGrid from '../../../app/components/DataGrid';
import Columns from './PagoCuota.json';
import PagoCuotasFilter from './PagoCuotasFilter';
import ModalEditPagoCuota from '../modals/ModalEditPagoCuota';
import ModalDeletePagoCuota from '../modals/ModalDeletePagoCuota';
import { PagoCuotaProps } from '../../../@redux/PagoCuota/types';
import ModalAddPagoMasivo from '../modals/ModalAddPagoMasivo';

const PagoCuotaList: React.FC<{ pagocuota: PagoCuotaProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { pagoCuotas } = HelperRedux.useSelector((state) => state.pagoCuotas)

    useEffect(() => {
        if (pagoCuotas.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getPagoCuotas().then(x => { dispatch(Actions.setPagoCuotasStore(x.data.value)) })

    }

    return (
        <>
        <main>
            <div className="modalMain">
                <div className="">
                    <h3>Pago de Cuotas</h3>
                </div>

                 <div className="">
                        <ModalAddPagoCuota />

                        <ModalAddPagoMasivo />
                </div> 
            </div>

            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.pagocuotas}
                onClickEdit={(row) => { <ModalEditPagoCuota pagocuotas={props.pagocuota} /> }}
                onClickDelete={(row) => { <ModalDeletePagoCuota pagocuotas={props.pagocuota} /> }}

                rows={pagoCuotas.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <PagoCuotasFilter onClosed={onClosedFilter} />}
            />
        </main>
    </>
    );
};

export default PagoCuotaList;