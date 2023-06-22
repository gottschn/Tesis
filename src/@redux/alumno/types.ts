const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_ALUMNOS: '_GET_ALUMNOS',
    SET_ALUMNO_STORE: '_SET_ALUMNO_STORE',
    CREATE_ALUMNOS: '_CREATE_ALUMNOS',
    UPDATE_ALUMNOS: '_UDATE_ALUMNOS',
    DELETE_ALUMNOS: '_DELETE_ALUMNOS',
    SET_ALUMNO_FILTER_STORE: `_SET_ALUMNO_FILTER_STORE`,
    
}

interface StateProps {
    isLoading: boolean;
    alumnos: AlumnoProps[];
    filter: AlumnosFilter;
}

interface AlumnoProps {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    direccion: string;
    telefono: string;
    mail: string;
    porcBeca: number;
    fechaIngreso: Date;
    legajo: string;
    carrerasId: [];
    carreras: any[];
}

interface AlumnosFilter {
    dni: number | string,
    legajo: number | string,
 }

export {
    TypeActions,
    StateProps,
    AlumnoProps,
    AlumnosFilter
}