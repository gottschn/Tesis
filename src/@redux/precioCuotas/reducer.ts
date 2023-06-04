import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    precioCuotas: [],

}

const reducer = (state = initialState, action: any = {} ) => {
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
            case TypeActions.GET_PRECIO_CUOTAS:
            nextState = {
                ...state,
                precioCuotas: []
            }
            break;
        case TypeActions.SET_PRECIO_CUOTAS_STORE:
            nextState = {
                ...state,
                precioCuotas: action.data
            }
            break;
            case TypeActions.CREATE_PRECIO_CUOTAS:
            nextState = {
                ...state,
                precioCuotas: [...state.precioCuotas, action.data]
            }
            break;
        case TypeActions.UPDATE_PRECIO_CUOTAS:
            nextState = {
                ...state,
                precioCuotas: state.precioCuotas.map((precioCuota) =>
                precioCuota.id === action.id ? action.data : precioCuota
                )
            }
            break;
        case TypeActions.DELETE_PRECIO_CUOTAS:
            nextState = {
                ...state,
                precioCuotas: state.precioCuotas.filter((precioCuota) => precioCuota.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;