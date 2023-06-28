const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_EXTENSIONES: '_GET_EXTENSIONES',
    SET_EXTENSIONES_STORE: '_SET_EXTENSIONES_STORE',
    CREATE_EXTENSIONES: '_CREATE_EXTENSIONES',
    UPDATE_EXTENSIONES: '_UDATE_EXTENSIONES',
    DELETE_EXTENSIONES: '_DELETE_EXTENSIONES',
    SET_EXTENSIONES_FILTER_STORE: '_SET_EXTENSIONES_FILTER_STORE',
}

interface StateProps {
    isLoading: boolean;
    extensiones: ExtensionProps[];
    filter: ExtensionFilter;
}

interface ExtensionProps {
    id: number;
    descripcion: string;

}

interface ExtensionFilter {
   id: number | string,
   descripcion: string,
}

export {
    TypeActions,
    StateProps,
    ExtensionProps,
    ExtensionFilter,
}