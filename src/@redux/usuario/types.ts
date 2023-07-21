const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_USUARIOS: '_GET_USUARIOS',
    SET_USUARIOS_STORE: '_SET_USUARIOS_STORE',
    CREATE_USUARIOS: '_CREATE_USUARIOS',
    UPDATE_USUARIOS: '_UDATE_USUARIOS',
    DELETE_USUARIOS: '_DELETE_USUARIOS',
    SET_USUARIOS_FILTER_STORE: `_SET_USUARIOS_FILTER_STORE`,
}

interface StateProps {
    isLoading: boolean;
    usuarios: UsuarioProps[];
    filter: UsuarioFilter;
}

interface UsuarioProps {
    id: number;
    nombre: string;
    password: string;
    rol: number;
    personaId: number;
}

interface UsuarioFilter {
   id: number | string,
   nombre: string,
}

export {
    TypeActions,
    StateProps,
    UsuarioProps,
    UsuarioFilter,
}