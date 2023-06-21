import React, { useRef } from 'react'
import { DataGridColumnProps } from './types'
import { PencilIcon, TrashIcon, PlusCircleIcon, NoEntryIcon } from '@primer/octicons-react'

import DataGridColumn from './DataGridColumn'

const DataGridRow: React.FunctionComponent<{ 
    row: any;
    columns: DataGridColumnProps[];
    subTableColumns?: DataGridColumnProps[];
    subTableName: string;
    canEdit: boolean;
    canDelete: boolean;
    onClickEdit?: (row: any) => void;
    onClickDelete?: (row: any) => void;
    onClickViewDetails?: (row: any) => void;
}> = ({
    row,
    columns,
    canEdit,
    canDelete,
    onClickEdit,
    onClickDelete,
    onClickViewDetails,
    subTableColumns = [],
    subTableName
}) => {
    const trRef = useRef<HTMLTableRowElement>(null)
    const showIcon = useRef<HTMLSpanElement>(null)
    const hidenIcon = useRef<HTMLSpanElement>(null)

    const truncateString = (value: any, limit: number | undefined) => {
        if(typeof(value) == 'string'){
            value = value.trim()
            if(limit)
                return (value?.length > limit) ? value?.substr(0, limit) + '...' : value;
        }
        
        return value
    }

    const handlerViewDetails = (item: any) => {
        if(trRef.current?.style.display){
            hidenIcon.current?.classList.replace('d-none', 'd-block')
            showIcon.current?.classList.add('d-none')
            
            trRef.current?.style.removeProperty('display')

            if(onClickViewDetails)
                onClickViewDetails(item)
        }
        else{
            hidenIcon.current?.classList.replace('d-block', 'd-none')
            showIcon.current?.classList.replace('d-none', 'd-block')

            trRef.current?.style.setProperty('display', 'none')
        }
    }

    return(
        <>
            <tr data-testid="row-abm" className="row-abm" >
                { onClickViewDetails && 
                    <td>
                        <button
                            data-testid="test-btn-view-detail"
                            className='button-clear-style button-abm'
                            onClick={() => handlerViewDetails(row)}
                         >

                            <span ref={showIcon}>
                                <PlusCircleIcon size={20} />
                            </span>
                            
                            <span className='d-none' ref={hidenIcon}>
                                <NoEntryIcon size={20} />
                            </span>

                        </button>
                    </td>
                }

                {columns.map((x, i) => (!x.hidden) && 
                    <td 
                        data-testid="row-test-data" 
                        scope='row' 
                        key={'data-grid-row-' + i}
                        className={`${x.fixedWidth && 'td-min-width'} ${x.field == 'errorType' && 'min-width'}`}
                    >
                        {truncateString(row[x.field], x.truncateTo)}
                    </td>
                )}

                {(canEdit || canDelete) && 
                    <td>
                        <div  style={{ display: 'flex' }}>
                            { canEdit && 
                                <button 
                                    style={{ visibility: 'hidden' }}
                                    data-testid="btn-edit-row"
                                    className="button-clear-style button-abm"
                                    onClick={() => onClickEdit && onClickEdit(row)}
                                >
                                    <PencilIcon fill="#6C9DFF" size={20} />
                                </button>
                            }

                            { canDelete && 
                                <button 
                                    style={{ visibility: 'hidden' }}
                                    data-testid="btn-delete-row"
                                    className="button-clear-style button-abm"  
                                    onClick={() => onClickDelete && onClickDelete(row)}
                                >
                                    <TrashIcon fill="red" size={20} />
                                </button>
                            }
                        </div>
                    </td>
                }
            </tr>

            {(onClickViewDetails && subTableColumns.length > 0) && 
                <tr style={{ display: 'none' }} ref={trRef}>
                    <td colSpan={columns.length + 1}>
                        <table className="table mb-0 ">
                            <thead className='table-dark' style={{ fontSize: '0.8rem' }}>
                                <tr>
                                    {subTableColumns.map((x, i) => <DataGridColumn key={`sub-column-index-${i}`} column={x} />)}
                                </tr>
                            </thead>

                            <tbody>
                                {row[subTableName] && (row[subTableName].length == 0) && 
                                    <tr>
                                        <td key={`data-grid-row-subtable-empty`} colSpan={subTableColumns.length}>No exiten registros para mostrar.</td>
                                    </tr>
                                }

                                {row[subTableName] && row[subTableName].map((item: any, i: number) => (
                                    <tr key={`data-grid-row-subtable-tr-${i}`}>{subTableColumns.map(col => (
                                        <td key={`data-grid-row-subtable-${col.field}`}>{item[col.field]}</td>))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
            }
        </>
    )
}

export default DataGridRow;