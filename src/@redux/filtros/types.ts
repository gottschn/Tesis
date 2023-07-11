const TypeActions = {
    GET_START: '_GET_START',
    GET_ERROR: '_GET_ERROR',
    GET_COMPLETE: '_GET_COMPLETE',
    GET_FILTROS: '_GET_FILTROS',

}

interface StateProps {
    isLoading: boolean;
    filtros: FiltrosProps[];
}

interface FiltrosProps {
    fechaDeCorte: Date,
}


export {
    TypeActions,
    StateProps,
    FiltrosProps,
}