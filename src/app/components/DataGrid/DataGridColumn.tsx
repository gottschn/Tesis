import React from 'react'
import { DataGridColumnProps } from './types';

const DataGridColumn: React.FunctionComponent<{ column: DataGridColumnProps }> = ({ column }) => {
    if(column.hidden)
        return null;
    
    return(
        <th scope="col" className='border-end text-nowrap'>{column.name}</th>
    )
}

export default DataGridColumn;