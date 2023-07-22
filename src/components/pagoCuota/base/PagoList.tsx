import React, { useEffect, useState } from 'react';
/* Redux */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/Pagos';
import { PagosProps } from '../../../@redux/Pagos/types';

/* components */
import { deletePagos, getPagos } from '../../../domain/pagos';
import ModalAddPagoCuota from '../modals/ModalAddPago';
import DataGrid from '../../../app/components/DataGrid';
import PagoCuotasFilter from './PagoFilter';
import ModalEditPago from '../modals/ModalEditPago';
import Columns from './Pago.json';
import ModalAddPagoMasivo from '../modals/ModalAddPagoMasivo';
import moment from 'moment';
import { ModalConfirmation } from '../../../app/components/Modal';
import ModalDeleteMasivoPago from '../modals/ModalDeleteMasivoPago';

const PagoList: React.FC<{ pago: PagosProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { pagos, filter} = HelperRedux.useSelector((state) => state.pagos)
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    const [showModal, setShowModal] = useState(false);
    const [currentPagos, setCurrentPagos] = useState<PagosProps>({} as PagosProps);

    useEffect(() => {
        if (pagos.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getPagos().then(x => { dispatch(Actions.setPagosStore(x.data.value)) })

    }

    const handleDeletePagos = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deletePagos(id).then(() => {
            dispatch(Actions.deletePagos(id))
        })
            .catch(error => console.log(error))
        window.location.reload()
    }

    const handlerDeleteNotification = () => {
        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })
    }

    return (
        <>

            <div className="modalMain">
                <div className="">
                    <h3>Pago de Cuotas</h3>
                </div>

                <div className="">

                    <ModalAddPagoMasivo />
                    <ModalDeleteMasivoPago />
                    <ModalAddPagoCuota />
                    

                    <ModalEditPago visible={showModal} onClosedModal={() => setShowModal(false)} pago={currentPagos} />
                </div>
            </div>

            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.pagocuotas}
                onClickEdit={(row) => {
                    setCurrentPagos(row)
                    setShowModal(true)
                }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={pagos.filter( x => x.legajo.includes(filter.legajo)).map(x => ({
                    ...x,
                    fechaCarga: moment(x.fechaCarga).format('YYYY-MM-DD'),
                    fechaRecibo: moment(x.fechaRecibo).format('YYYY-MM-DD'),
                }),
                )}
                filterComponent={(onClosedFilter) => <PagoCuotasFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeletePagos}
                onClickNo={handlerDeleteNotification} children={undefined}
            />

        </>
    );
};

export default PagoList;