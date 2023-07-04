import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    precioCarreras: [],
    carreras: [],
    filter: {
        carreraId: '',
        monto: '',
    }

}

const reducer = (state = initialState, action: any = {}) => {
    let nextState: StateProps;
    switch (action.type) {
        case TypeActions.GET_START:
            nextState = {
                ...state,
                isLoading: true
            }
            break;
        case TypeActions.GET_COMPLETE:
            nextState = {
                ...state,
                isLoading: true
            }
            break;
        case TypeActions.GET_PRECIO_CARRERAS:
            nextState = {
                ...state,
                precioCarreras: []
            }
            break;
        case TypeActions.SET_PRECIO_CARRERAS_STORE:
            nextState = {
                ...state,
                precioCarreras: action.data
            }
            break;
        case TypeActions.CREATE_PRECIO_CARRERAS:
            nextState = {
                ...state,
                precioCarreras: [...state.precioCarreras, action.data]
            }
            break;
        case TypeActions.UPDATE_PRECIO_CARRERAS:
            nextState = {
                ...state,
                precioCarreras: state.precioCarreras.map((precioCuota) =>
                    precioCuota.id === action.id ? action.data : precioCuota
                )
            }
            break;
        case TypeActions.DELETE_PRECIO_CARRERAS:
            nextState = {
                ...state,
                precioCarreras: state.precioCarreras.filter((precioCarrera) => precioCarrera.id !== action.data.id),
            }
            break;
        case TypeActions.SET_PRECIO_CARRERA_FILTER_STORE:
            nextState = {
                ...state,
                filter: {
                    carreraId: action.carreraId,
                    monto: action.monto
                }
            }
            break;
        default:
            nextState = state
            break;
    }

    return nextState;
}
export default reducer;