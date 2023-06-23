import React, { useEffect } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/ciudad/actions';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
/* icons */
import { getCiudades } from '../../../domain/ciudades';

import ModalAddCiudad from '../modals/ModalAddCiudad';
import CiudadFilter from './CiudadFilter';
import { CiudadesProps } from '../../../@redux/ciudad/types';
import ModalEditCiudad from '../modals/ModalEditCiudad';
import ModalDeleteCiudad from '../modals/ModalDeleteCiudad';
import Columns from './Ciudades.json';


const CiudadList: React.FC<{ ciudad: CiudadesProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { ciudades } = HelperRedux.useSelector((state) => state.ciudades)

    useEffect(() => {
            getInitial()
    }, [])

    const getInitial = () => {
        getCiudades().then(x => { dispatch(Actions.setCiudadesStore(x.data.value)) })

    }
    return (
        <>
            <main>
                <div className="row">
                    <div className="col-6">
                        <h3>Listado de Ciudades</h3>
                    </div>

                    <div className="col-6 d-flex justify-content-end mb-1">
                        <ModalAddCiudad />
                    </div>
                </div>
                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.ciudades}
                     onClickEdit={(row) => { <ModalEditCiudad ciudad={props.ciudad} /> }}
                    onClickDelete={(row) => { <ModalDeleteCiudad ciudad={props.ciudad} /> }} 

                    rows={ciudades.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <CiudadFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default CiudadList;