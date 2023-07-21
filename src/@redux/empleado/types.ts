const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_EMPLEADOS: '_GET_EMPLEADOS',
    SET_EMPLEADOS_STORE: '_SET_EMPLEADOS_STORE',
    CREATE_EMPLEADOS: '_CREATE_EMPLEADOS',
    UPDATE_EMPLEADOS: '_UDATE_EMPLEADOS',
    DELETE_EMPLEADOS: '_DELETE_EMPLEADOS',
    SET_EMPLEADOS_FILTER_STORE: `_SET_EMPLEADOS_FILTER_STORE`,
    
}

interface StateProps {
    isLoading: boolean;
    empleados: EmpleadosProps[];
    filter: EmpleadosFilter;
}

interface EmpleadosProps {
    id: number;
    apynom: string;
    tipoDoc: number;
    nroDoc: string;
    fechaNacimiento: Date;
    direccion: string;
    telefono: string;
    mail: string;
    extensionId: number;
    extension: string;
    ciudadId: number;
    codigoPostal: number;
    ciudad: string;
    areaTrabajo: string;
}

interface EmpleadosFilter {
    dni: number | string,
    apynom: string,
 }

export {
    TypeActions,
    StateProps,
    EmpleadosProps,
    EmpleadosFilter
}