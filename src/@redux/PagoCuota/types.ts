import { CuotaProps } from "../cuotas/types";

const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_PAGO_CUOTAS: '_GET_PAGO_CUOTAS',
    SET_PAGO_CUOTAS_STORE: '_SET_PAGO_CUOTAS_STORE',
    CREATE_PAGO_CUOTAS: '_CREATE_PAGO_CUOTAS',
    UPDATE_PAGO_CUOTAS: '_UPDATE_PAGO_CUOTAS',
    DELETE_PAGO_CUOTAS: '_DELETE_PAGO_CUOTAS',
    SET_PAGO_CUOTAS_FILTER_STORE: '_SET_PAGO_CUOTAS_FILTER_STORE',

}

interface StateProps {
    isLoading: boolean;
    pagoCuotas: PagoCuotaProps[];
    cuotas: CuotaProps[];
    filter: PagoCuotaFilter;
}

interface PagoCuotaProps {
    id: number;
    monto: number;
    fechaPago: string;
    porcPago: number;
    cuotaId: number;
    cuotas?: CuotaProps;

}

interface PagoCuotaFilter {
    monto: number | string,
    cuotaid: number | string
} 

export {
    TypeActions,
    StateProps,
    PagoCuotaProps,
    PagoCuotaFilter,
}