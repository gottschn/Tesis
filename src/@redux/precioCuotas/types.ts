const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_PRECIO_CUOTAS: '_GET_PRECIO_CUOTAS',
    SET_PRECIO_CUOTAS_STORE: '_SET_PRECIO_CUOTAS_STORE',
    CREATE_PRECIO_CUOTAS: '_CREATE_PRECIO_CUOTAS',
    UPDATE_PRECIO_CUOTAS: '_UPDATE_PRECIO_CUOTAS',
    DELETE_PRECIO_CUOTAS: '_DELETE_PRECIO_CUOTAS',
}

interface StateProps {
    isLoading: boolean;
    precioCuotas: PrecioCuotaProps[];
}

interface PrecioCuotaProps {
    id: number;
    monto: number;
    fecha: Date | string;
    carrera: number;

}

export {
    TypeActions,
    StateProps,
    PrecioCuotaProps,
}