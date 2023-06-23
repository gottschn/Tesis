const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_CARRERAS: '_GET_CARRERAS',
    SET_CARRERAS_STORE: '_SET_CARRERAS_STORE',
    GET_PRECIO_CUOTAS: '_GET_PRECIO_CUOTAS',
    CREATE_CARRERAS: '_CREATE_CARERAS',
    UPDATE_CARRERAS: '_UDATE_CARRERAS',
    DELETE_CARRERAS: '_DELETE_CARRERAS',
    SET_CARRERA_FILTER_STORE: `_SET_CARRERA_FILTER_STORE`,
}

interface StateProps {
    isLoading: boolean;
    carreras: CarrerasProps[];
    filter: CarrerasFilter;
}

interface CarrerasProps {
    id: number;
    descripcion: string;
    cantCuotas: number;
    precioCarrera: number;
    fecha: Date | string;

}

interface CarrerasFilter {
   id: number | string,
   descripcion: string,
}

export {
    TypeActions,
    StateProps,
    CarrerasProps,
    CarrerasFilter,
}