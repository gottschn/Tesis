import { AlumnoProps } from "../alumno/types";
import { PrecioCuotaProps } from "../precioCuotas/types";

const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_CUOTAS: '_GET_CUOTAS',
    SET_CUOTAS_STORE: '_SET_CUOTAS_STORE',
    CREATE_CUOTAS: '_CREATE_CUOTAS',
    UPDATE_CUOTAS: '_UPDATE_CUOTAS',
    DELETE_CUOTAS: '_DELETE_CUOTAS',
}

interface StateProps {
    isLoading: boolean;
    cuotas: CuotaProps[];
    precioCuotas: PrecioCuotaProps [];
    alumnos?: AlumnoProps [];
}

interface CuotaProps {
    id: number;
    numero: number;
    alumnoId: number;
    precioCuotaId: number;
    alumno?: AlumnoProps;
}

export {
    TypeActions,
    StateProps,
    CuotaProps,
}