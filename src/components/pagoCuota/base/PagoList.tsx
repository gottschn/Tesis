import React, {useEffect} from 'react';
/* Redux */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/Pagos';
import { PagosProps } from '../../../@redux/Pagos/types';

/* components */
import { getPagos } from '../../../domain/pagos';
import ModalAddPagoCuota from '../modals/ModalAddPago';
import DataGrid from '../../../app/components/DataGrid';
import PagoCuotasFilter from './PagoFilter';
import ModalEditPago from '../modals/ModalEditPago';
import ModalDeletePago from '../modals/ModalDeletePago';
import Columns from './Pago.json';
import { Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate } from 'react-router-dom';
import ModalAddPagoMasivo from '../modals/ModalAddPagoMasivo';

const PagoList: React.FC<{ pago: PagosProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { pagos } = HelperRedux.useSelector((state) => state.pagos)
    const navigate = useNavigate()
    useEffect(() => {
        if (pagos.length === 0)
            getInitial();
    }, [])

    const handleRedirectMasive = () => {
        navigate("/pagosmasivo")
     };
    const getInitial = () => {
        getPagos().then(x => { dispatch(Actions.setPagosStore(x.data.value)) })

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
                onClickEdit={(row) => { <ModalEditPago pago={props.pago} /> }}
                onClickDelete={(row) => { <ModalDeletePago pago={props.pago} /> }}

                rows={pagos.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <PagoCuotasFilter onClosed={onClosedFilter} />}
            />
        </main>
    </>
    );
};

export default PagoList;