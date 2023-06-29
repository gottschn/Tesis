import { AlumnoProps } from "../alumno/types";

const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_PAGO: '_GET_PAGO',
    SET_PAGO_STORE: '_SET_PAGO_STORE',
    CREATE_PAGO: '_CREATE_PAGO',
    UPDATE_PAGO: '_UPDATE_PAGO',
    DELETE_PAGO: '_DELETE_PAGO',
    SET_PAGO_FILTER_STORE: '_SET_PAGO_FILTER_STORE',
}

interface StateProps {
    isLoading: boolean;
    pagos: PagosProps[];
    alumnos: AlumnoProps[]; 
    filter: PagosFilter;
}

interface PagosProps {
    id: number;
    legajo: string;
    cantCuota: number;
    nroCuota: number;
    monto: number;
    nroRecibo: number;
    fechaCarga: Date;
    fechaRecibo: Date;
    alumnoId: number;
    alumno?: AlumnoProps;
}

interface PagosFilter {
    legajo: string,
} 

export {
    TypeActions,
    StateProps,
    PagosProps,
    PagosFilter,
}