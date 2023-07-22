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
    /* Masivo */
    ADD_PAGOS_MASSIVO: `_ADD_PAGOS_MASSIVO`,
    CONFIRM_PAGOS_MASSIVO: `_CONFIRM_PAGOS_MASSIVO`,
    DELETE_PAGOS_MASSIVO: `_DELETE_PAGOS_MASSIVO`,
    CLEAN_PAGOS_STORE: `_CLEAN_PAGOS_STORE`,
}

interface StateProps {
    isLoading: boolean;
    pagos: PagosProps[];
    alumnos: AlumnoProps[]; 
    filter: {
        legajo: string,
    };
}

interface PagosProps {
    id: number,
    legajo: string,
    cantCuota: number,
    monto: number,
    nroRecibo: number,
    fechaCarga: Date,
    fechaRecibo: Date,
    alumnoId?: number,
    alumno?: AlumnoProps,
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