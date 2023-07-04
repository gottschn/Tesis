/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { DataGridProps, DataPaginationProps } from './types'
import './styles.css'

import DataGridColumn from './DataGridColumn'
import DataGridRow from './DataGridRow'
import DataGridPagination from './DataGridPagination'
import DataGridColumnEdit from './DataGridColumnEdit'
import { DataGridColumnProps } from '.'
import DataGridFilter from './DataGridFilter'

const DataGrid: React.FunctionComponent<DataGridProps> = ({
    columns,
    rows,
    pageSize = 10,
    pagination,
    onChangePages,
    onChangePageSize,
    canEdit = true,
    canDelete = true,
    onClickEdit,
    onClickDelete,
    filterComponent,
    singlePagination = false,
    subTableColumns,
    subTableName = '',
    onClickViewDetails,
    style
}) => {
    const [handlerPagination, setHandlerPagination] = useState({ currentPage: 1, sizePage: pageSize })
    const [handlerColumns, setHandlerColumns] = useState(columns)

    React.useEffect(() => {
        if(singlePagination){
            setHandlerPagination({ currentPage: 1, sizePage: pageSize })
        }  
    }, [rows])

    const handlerChangePages = (page: DataPaginationProps) => {
        if(singlePagination)
            setHandlerPagination({ ...handlerPagination, currentPage: page.currentPage })
        
        if(onChangePages)
            onChangePages(page)
    }

    const handlerChangePageSize = (numberPage: number) => {
        if(singlePagination)
            setHandlerPagination({ currentPage: 1, sizePage: numberPage })
        
        if(onChangePageSize)
            onChangePageSize(numberPage)
    }

    const handlerChangeColumn = (column: DataGridColumnProps, index: number) => {
        setHandlerColumns(columns.map((x, i) => {
            if(i == index)
                x.hidden = !x.hidden

            return x;
        }))
    }

    const handlerPaginateRows = (array: any[], page_size: number, page_number: number) => {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        if(singlePagination)
            return array.slice((page_number - 1) * page_size, page_number * page_size);
        else
            return array;
    }

    const getPagination = () => {
        const page: DataPaginationProps = (pagination) ? pagination : { currentPage: 0, totalPage: 0 };
        if(singlePagination) {
            page.currentPage = handlerPagination.currentPage;
            page.totalPage = (Math.ceil(rows.length / handlerPagination.sizePage));
        }

        return page;
    }

    return (
        <>
            <div className='container-data-grid'>
                <div className='table-responsive' style={style ? style : { height: '60vh' }}>
                    <table className="table table-hover">
                        <thead className="table-light" style={{ fontSize: '0.8rem', position: 'sticky', top: 0 }}>
                            <tr>
                                <th colSpan={handlerColumns.filter(x => !x.hidden).length + ((canEdit || canDelete || onClickViewDetails) ? 1 : 0)}>
                                    <div className="d-flex">
                                        <DataGridColumnEdit 
                                            columns={columns}
                                            onChangeColumn={handlerChangeColumn}
                                        />

                                        {filterComponent && <DataGridFilter children={filterComponent} />}
                                    </div>
                                </th>
                            </tr>

                            <tr>
                                {onClickViewDetails && <th key={'data-grid-column-button-view-details'} scope="col"></th>}
                                {handlerColumns.map(x => <DataGridColumn key={'data-grid-column-' + x.field} column={x} />)}
                                {(canEdit || canDelete) && <th key={'data-grid-column-button-edit-delete'} scope="col"></th>}
                            </tr>
                        </thead>

                        <tbody>
                            {handlerPaginateRows(rows, handlerPagination.sizePage, handlerPagination.currentPage).map((x, i) => 
                                <DataGridRow
                                    subTableColumns={subTableColumns}
                                    subTableName={subTableName}
                                    onClickViewDetails={onClickViewDetails} 
                                    key={'row' + i} 
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                    onClickEdit={onClickEdit}
                                    onClickDelete={onClickDelete}
                                    columns={handlerColumns} 
                                    row={{ ...x, index: i }} 
                                />
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="footer-data-grid">
                    <DataGridPagination
                        pagination={getPagination()}
                        pageSize={singlePagination ? handlerPagination.sizePage : pageSize}
                        onChangePage={handlerChangePages}
                        onChangePageSize={handlerChangePageSize}
                    />
                </div>
            </div>
        </>
    )
}

export default DataGrid;