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
    /* Masivo */
    ADD_ALUMNOS_MASSIVO: `_ADD_ALUMNOS_MASSIVO`,
    DELETE_ALUMNOS_MASSIVO: `_DELETE_ALUMNOS_MASSIVO`,
    CONFIRM_ALUMNOS_MASSIVO: `_CONFIRM_ALUMNOS_MASSIVO`,
    CLEAN_ALUMNOS_STORE: `_CLEAN_ALUMNOS_STORE`,
}

interface StateProps {
    isLoading: boolean;
    alumnos: AlumnoProps[];
    filter: {
        nroDoc: number | string,
        legajo: string,
    };
}

interface AlumnoProps {
    id: number;
    legajo: string,
    apynom: string,
    tipoDoc: number,
    nroDoc: string,
    carreraId: number;
    carreras: any[];
    pagos: any[],
    fechaNacimiento: Date,
    fechaIngreso: Date,
    direccion: string,
    telefono: string,
    mail: string,
    extensionId: number,
    extension: string,
    ciudadId: number,
    ciudad: string,
    codigoPostal: number,
    desde: Date,
    hasta: Date,
}

interface AlumnosFilter {
    nroDoc: number | string,
    legajo: number | string,
 }

export {
    TypeActions,
    StateProps,
    AlumnoProps,
    AlumnosFilter
}