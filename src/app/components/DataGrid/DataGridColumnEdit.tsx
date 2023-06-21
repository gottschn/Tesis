/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import { DataGridColumnProps } from '.';

import { GrabberIcon } from '@primer/octicons-react'

const DataGridColumnEdit: React.FunctionComponent<{
    columns: DataGridColumnProps[];
    onChangeColumn: (columns: DataGridColumnProps, index: number) => void;
}> = ({ columns, onChangeColumn }) => {
    
    return(
        <>
            <div className="dropdown">
                <button 
                    className="btn btn-light btn-sm d-flex align-items-center" 
                    type="button" 
                    id="dropdownMenuColumnFilter" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    <span className="me-1">COLUMNAS</span>
                    <GrabberIcon size={18} />
                </button>

                <ul 
                    className="dropdown-menu" 
                    style={{ width: 'max-content' }} 
                    aria-labelledby="dropdownMenuColumnFilter"
                >
                    {columns.map((x, i) => (
                        <li key={'li-check-column-' + i + x.field}>
                            <div className="form-check" style={{ marginLeft: 10 }}>
                                <input 
                                    data-testid="btn-toggle-column" 
                                    role="checkbox" 
                                    className="form-check-input" 
                                    key={'check-column-input-' + i + x.field} 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => onChangeColumn(x, i)} 
                                    type="checkbox" 
                                    defaultChecked={!x.hidden} 
                                />

                                <label className="form-check-label">
                                    {x.name}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default DataGridColumnEdit;