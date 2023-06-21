import React from 'react'
import { DataPaginationProps } from './types';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataGridPagination: React.FunctionComponent<{
    pagination: DataPaginationProps;
    onChangePage: (page: DataPaginationProps) => void;
    onChangePageSize: (pageSize: number) => void;
    pageSize: number;
}> = ({
    pagination,
    onChangePage,
    pageSize,
    onChangePageSize
}) => { 
    const handlerNextPage = () => {
        pagination.currentPage++
        if(pagination.currentPage <= pagination.totalPage)
            onChangePage(pagination)
    }
    
    const handlerPreviewPage = () => {
        pagination.currentPage--
        if(pagination.currentPage >= 1)
            onChangePage(pagination)
    }

    const handleChangeSizePage = (e: any) => {
        onChangePageSize(e.target.value)
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center pt-3">
                <div className='d-flex ms-3'>
                    <label className='ms-2' style={{ fontSize: '0.8rem', marginBottom: 0 }}>
                        Filas por p&aacute;gina 
                    </label>
                    
                    <select 
                        data-testid="select-change-sizepage" 
                        style={{
                            cursor: 'pointer',
                            border: 'none',
                            borderBottom: '1px solid #adb5bd'
                        }} 
                        onChange={handleChangeSizePage} 
                        value={pageSize}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                <div className='d-flex align-items-center me-3 '>
                    <span>{`Página ${pagination.currentPage} de ${pagination.totalPage} `}</span>

                    <div className='d-flex ms-2'>
                        <button 
                            data-testid="btn-preview-page" 
                            onClick={handlerPreviewPage} 
                            type="button" 
                            disabled={pagination.currentPage === 1}
                            className="button-clear-style button-pagination-data-grid"
                        >
                            { <FontAwesomeIcon color="red"  icon={faArrowAltCircleLeft} /> }
                        </button>

                        <button 
                            data-testid="btn-next-page" 
                            onClick={handlerNextPage} 
                            type='button' 
                            disabled={pagination.currentPage === pagination.totalPage}
                            className="button-clear-style button-pagination-data-grid"
                        >
                            { <FontAwesomeIcon color='red' icon={faArrowAltCircleRight} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataGridPagination;