import React, { useEffect } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/carreras/index'
/* Components */
/* icons */
import { getCarreras } from '../../../domain/carreras';
import DataGrid from '../../../app/components/DataGrid';

import ModalAddCarrera from '../modals/ModalAddCarrera';
import ModalDeleteCarrera from '../modals/ModalDeleteCarrera';
import { CarrerasProps } from '../../../@redux/carreras/types';
import CarreraFilter from './CarreraFilter';
import ModalEditCarrera from '../modals/ModalEditCarrera';
import Columns from './Carreras.json';


const CarreraList: React.FC<{ carrera: CarrerasProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { carreras } = HelperRedux.useSelector((state) => state.carreras)

    useEffect(() => {
        if (carreras.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getCarreras().then(x => { dispatch(Actions.setCarrerasStore(x.data.value)) })

    }
    return (
        <>
            <main>
                <div className="row">
                    <div className="col-6">
                        <h3>Listado de Carreras</h3>
                    </div>

                    <div className="col-6 d-flex justify-content-end mb-1">
                        <ModalAddCarrera />
                    </div>
                </div>
                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.carreras}
                    onClickEdit={(row) => { <ModalEditCarrera carrera={props.carrera} /> }}
                    onClickDelete={(row) => { <ModalDeleteCarrera carrera={props.carrera} /> }}

                    rows={carreras.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <CarreraFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default CarreraList;