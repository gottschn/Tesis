import { CarrerasProps } from "../carreras/types";

const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_PRECIO_CARRERAS: '_GET_PRECIO_CARRERAS',
    SET_PRECIO_CARRERAS_STORE: '_SET_PRECIO_CARRERAS_STORE',
    CREATE_PRECIO_CARRERAS: '_CREATE_PRECIO_CARRERAS',
    UPDATE_PRECIO_CARRERAS: '_UPDATE_PRECIO_CARRERAS',
    DELETE_PRECIO_CARRERAS: '_DELETE_PRECIO_CARRERAS',
    SET_PRECIO_CARRERA_FILTER_STORE: `_SET_PRECIO_CARRERA_FILTER_STORE`,
}

interface StateProps {
    isLoading: boolean;
    precioCarreras: PrecioCarreraProps[];
    carreras?: CarrerasProps[];
    filter: {
        descripcion: any,
    };
}

interface PrecioCarreraProps {
    id: number;
    monto: number;
    matricula: number;
    fecha: Date;
    carreraId: number,
    carrera?: CarrerasProps[];

}

interface PrecioCarreraFilter {
    carreraId: number | string,
    monto: number | string,
}

export {
    TypeActions,
    StateProps,
    PrecioCarreraProps,
    PrecioCarreraFilter
}