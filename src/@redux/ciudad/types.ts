const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_CIUDADES: '_GET_CIUDADES',
    SET_CIUDADES_STORE: '_SET_CIUDADES_STORE',
    CREATE_CIUDADES: '_CREATE_CIUDADES',
    UPDATE_CIUDADES: '_UDATE_CIUDADES',
    DELETE_CIUDADES: '_DELETE_CIUDADES',
    SET_CIUDADES_FILTER_STORE: `_SET_CIUDADES_FILTER_STORE`,
}

interface StateProps {
    isLoading: boolean;
    ciudades: CiudadesProps[];
    filter: {
        descripcion: string,
    };
}

interface CiudadesProps {
    id: number;
    descripcion: string;

}

interface CiudadesFilter {
   id: number | string,
   descripcion: string,
}

export {
    TypeActions,
    StateProps,
    CiudadesProps,
    CiudadesFilter,
}