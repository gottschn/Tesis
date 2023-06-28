import React, { useEffect, useImperativeHandle } from 'react'
import { DataGridSingleProps, DataGridRefProps } from './types'

const DataGridSingle = React.forwardRef<DataGridRefProps, DataGridSingleProps>((
    { canSelect = false, ...props}, ref) => {
    
    const getListInputsCheckbox = () : NodeListOf<HTMLInputElement> => document.querySelectorAll("#datagrid-single-table input[type=checkbox]")

    useImperativeHandle(ref, () => {
        return {
            onGetSelection: onCallbackSelect
        }
    }, [props.rows.length]);

    useEffect(() => {
        const checkbox = getListInputsCheckbox()
        checkbox.forEach(x => {
            x.checked = false;
            x.addEventListener('change', onHandlerSelection)
        })
        
        return () => {
            checkbox.forEach(x => x.removeEventListener('change', onHandlerSelection))
        }
    }, [props.rows.length])

    const onHandlerSelection = (e: any) => {
        if(e.target.value === 'all')
            toggleSelectAll(e.target.checked)
    }

    const onCallbackSelect = () => {
        const list: any[] = []
        getListInputsCheckbox().forEach(x => {
            if (x.checked && x.value !== 'all')
                list.push(props.rows[parseInt(x.value)])
        })

        return list
    }

    const toggleSelectAll = (value: boolean) => {
        getListInputsCheckbox().forEach(x => x.checked = value)
    }

    return (
        <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
            <table 
                id='datagrid-single-table'
                style={{ fontSize: '0.850rem' }}
                className='table table-hover border'
            >
                <thead className='table-light fixed-cell'>
                    <tr>
                        {canSelect && 
                            <th scope='col' key='col-checkbox'>
                                <input 
                                    value="all" 
                                    style={{ cursor: 'pointer', margin: '2px' }} 
                                    type='checkbox' 
                                />
                            </th>
                        }

                        {props.columns.map((x, index) => 
                            <th 
                                key={'col-' + index} 
                                scope="col"
                            >
                                    {x.name}
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {props.rows.map((r, index) => 
                        <tr 
                            key={'row-'+ index} 
                            data-testid='row-abm' 
                            role='row'
                        >
                            {canSelect && 
                                <td key={'row-td-checkbox-' + index}>
                                    <input 
                                        value={index} 
                                        style={{ cursor: 'pointer' }} 
                                        type='checkbox' 
                                    />
                                </td>
                            }

                            {props.columns.map((c, i) => 
                                <td 
                                    key ={'row-td-'+ i}
                                >
                                    {r[c.field]}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>        
        </div>
    )
})

export default DataGridSingle;