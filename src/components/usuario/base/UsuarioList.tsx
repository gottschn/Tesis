import React, { useEffect } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/usuario/actions';
import { getUsuarios } from '../../../domain/usuarios';
import { UsuarioProps } from '../../../@redux/usuario/types';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
import UsuarioFilter from './UsuarioFilter';
import ModalEditUsuario from '../modals/ModalEditUsuario';
import ModalAddUsuario from '../modals/ModalAddUsuario';
import ModalDeleteUsuario from '../modals/ModalDeleteUsuario';
/* icons */

import Columns from './Usuarios.json';


const UsuarioList: React.FC<{ usuario: UsuarioProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { usuarios } = HelperRedux.useSelector((state) => state.usuarios)

    useEffect(() => {
            getInitial()
    }, [])

    const getInitial = () => {
        getUsuarios().then(x => { dispatch(Actions.setUsuariosStore(x.data.value)) })

    }
    return (
        <>
            <main>
                <div className="row">
                    <div className="col-6">
                        <h3>Listado de Usuarios</h3>
                    </div>

                    <div className="col-6 d-flex justify-content-end mb-1">
                        <ModalAddUsuario />
                    </div>
                </div>
                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.usuarios}
                     onClickEdit={(row) => { <ModalEditUsuario usuario={props.usuario} /> }}
                    onClickDelete={(row) => { <ModalDeleteUsuario usuario={props.usuario} /> }} 

                    rows={usuarios.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <UsuarioFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default UsuarioList;