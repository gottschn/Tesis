import React, { useEffect, useState } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/usuario/actions';
import { deleteUsuarios, getUsuarios } from '../../../domain/usuarios';
import { UsuarioProps } from '../../../@redux/usuario/types';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
import UsuarioFilter from './UsuarioFilter';
import ModalEditUsuario from '../modals/ModalEditUsuario';
import ModalAddUsuario from '../modals/ModalAddUsuario';
import ModalDeleteUsuario from '../modals/ModalDeleteUsuario';
/* icons */

import Columns from './Usuarios.json';
import { ModalConfirmation } from '../../../app/components/Modal';


const UsuarioList: React.FC<{ usuario: UsuarioProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { usuarios } = HelperRedux.useSelector((state) => state.usuarios)
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    useEffect(() => {
        getInitial()
    }, [])

    const getInitial = () => {
        getUsuarios().then(x => { dispatch(Actions.setUsuariosStore(x.data.value)) })

    }

    const handleDeleteUsuario = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deleteUsuarios(id).then(() => {
            dispatch(Actions.deleteUsuarios(id))
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
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={usuarios.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <UsuarioFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteUsuario}
                onClickNo={handlerDeleteNotification} children={undefined}
            />
        </>
    );
};

export default UsuarioList;