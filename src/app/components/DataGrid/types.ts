import React from 'react'

interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns: DataGridColumnProps[];
    subTableColumns?: DataGridColumnProps[];
    subTableName?: string;
    rows: any[];
    pagination?: DataPaginationProps;
    onChangePages?: (page: DataPaginationProps) => void;
    onChangePageSize?: (pageSize: number) => void;
    pageSize?: number;
    canEdit?: boolean;
    canDelete?: boolean;
    filterComponent?: (onClosedFilter: (isActiveFilter: boolean) => void) => React.ReactChild;
    onClickEdit?: (row: any) => void;
    onClickDelete?: (row: any) => void;
    singlePagination?: boolean;
    emptyText?: string;
    onClickViewDetails?: (row: any) => void;
}

interface DataGridColumnProps {
    field: string;
    name: string;
    truncateTo?: number;
    hidden?: boolean;
    fixedWidth?: boolean; 
}

interface DataPaginationProps {
    currentPage: number;
    totalPage: number;
}

interface DataGridSingleProps {
    columns: DataGridColumnProps[];
    rows: any[];
    canSelect?: boolean;
    ref: React.MutableRefObject<DataGridRefProps>;
}

interface DataGridRefProps {
    onGetSelection: () => any[];
}

export {
    DataGridProps,
    DataGridColumnProps,
    DataPaginationProps,
    DataGridSingleProps,
    DataGridRefProps,
}