import React, { useEffect }from 'react';
/* REDUX */
import { HelperRedux } from '../../../@redux';
import { PrecioCarreraProps } from '../../../@redux/precioCarrera/types';
import { Actions } from '../../../@redux/precioCarrera';

/* Components */
import PrecioCarreraFilter from './PrecioCarreraFilter';
import { getPrecioCarreras } from '../../../domain/precioCarreras';
import DataGrid from '../../../app/components/DataGrid';
import ModalEditPrecioCarrera from '../modals/ModalEditPrecioCarrera';
import ModalDeletePrecioCarrera from '../modals/ModalDeletePrecioCarrera';
import ModalAddPrecioCarrera from '../modals/ModalAddPrecioCarrera';
import Columns from './PrecioCarreras.json';


const PrecioCarreraList: React.FC<{ precioCarrera: PrecioCarreraProps }> = ({ ...props })=> {
    const dispatch = HelperRedux.useDispatch()
    const { precioCarreras } = HelperRedux.useSelector((state) => state.precioCarrera)

    useEffect(() => {
        if (precioCarreras.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getPrecioCarreras().then(x => { dispatch(Actions.setPrecioCarrerasStore(x.data.value)) })

    }
    return (
        <>
        <main>
            <div className="row">
                <div className="col-6">
                    <h3>Precio de las Carreras</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddPrecioCarrera />
                </div>
            </div>
            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.precioCarreras}
                onClickEdit={(row) => { <ModalEditPrecioCarrera precioCuota={props.precioCarrera} /> }}
                onClickDelete={(row) => { <ModalDeletePrecioCarrera precioCuota={props.precioCarrera} /> }}

                rows={precioCarreras.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <PrecioCarreraFilter onClosed={onClosedFilter} />}
            />
        </main>
    </>
    );
};

export default PrecioCarreraList;