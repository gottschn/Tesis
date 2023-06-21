import React, { useRef } from 'react'
import { FilterIcon } from '@primer/octicons-react'

const DataGridFilter: React.FunctionComponent<{
    children: (onToggleActiveFilter: (isActivefilter: boolean) => void) => React.ReactChild
}> = ({ children }) => {
    const menuRef = useRef<HTMLUListElement>(null)
    const activeFilterRef = useRef<HTMLDivElement>(null)

    const handlerToggleMenu = () => {
        if(menuRef.current?.classList.contains('show'))
            menuRef.current?.classList.remove('show')
        else
            menuRef.current?.classList.add('show')
    }

    const onClosedFilter = (isActive: boolean) => {
        handlerToggleMenu()
        if(isActive)
            activeFilterRef.current?.classList.add('circle-point-filter')
        else
            activeFilterRef.current?.classList.remove('circle-point-filter')
    }

    return(
        <>
            <div className="dropdown ms-3">
                <button
                    data-testid="btn-toggle-menu-filter"
                    onClick={handlerToggleMenu} 
                    className="btn btn-light btn-sm d-flex align-items-center" 
                    type="button"
                    aria-expanded="false"
                >
                    <span className="me-2">FILTRO</span>
                    <FilterIcon size={15} />
                    <div ref={activeFilterRef} className=""></div>
                </button>
                
                <ul ref={menuRef} className="dropdown-menu" style={{ padding: '0 1rem 1rem 1rem'}}>
                    <div className="d-flex justify-content-end mb-1">
                        <button className="btn" onClick={handlerToggleMenu}>x</button>
                    </div>
                    {children((value) => onClosedFilter(value))}
                </ul>
            </div>
        </>
    )
}

export default DataGridFilter;