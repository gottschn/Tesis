import React, { useEffect } from 'react';

/* REDUX */
import { ExtensionProps } from '../../../@redux/extension/types';
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/extension';
import { getExtensiones } from '../../../domain/extensiones';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
import ExtensionFilter from './ExtensionFilter';
import ModalAddExtension from '../modals/ModalAddExtension';
import ModalEditExtension from '../modals/ModalEditExtension';
import ModalDeleteExtension from '../modals/ModalDeleteExtension';
/* icons */
import Columns from './Extension.json';

const ExtensionList: React.FC<{ extension: ExtensionProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { extensiones } = HelperRedux.useSelector((state) => state.extensiones)

    useEffect(() => {
        if (extensiones.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getExtensiones().then(x => { dispatch(Actions.setExtensionesStore(x.data.value)) })

    }
    return (
        <>
            <main>
                <div className="row">
                    <div className="col-6">
                        <h3>Listado de Extensiones</h3>
                    </div>

                    <div className="col-6 d-flex justify-content-end mb-1">
                        <ModalAddExtension />
                    </div>
                </div>
                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.extension}
                    onClickEdit={(row) => { <ModalEditExtension extension={props.extension} /> }}
                    onClickDelete={(row) => { <ModalDeleteExtension extension={props.extension} /> }}

                    rows={extensiones.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <ExtensionFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default ExtensionList;