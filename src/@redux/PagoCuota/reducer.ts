import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    pagoCuotas: [],

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
            case TypeActions.GET_PAGO_CUOTAS:
            nextState = {
                ...state,
                pagoCuotas: []
            }
            break;
        case TypeActions.SET_PAGO_CUOTAS_STORE:
            nextState = {
                ...state,
                pagoCuotas: action.data
            }
            break;
            case TypeActions.CREATE_PAGO_CUOTAS:
            nextState = {
                ...state,
                pagoCuotas: [...state.pagoCuotas, action.data]
            }
            break;
        case TypeActions.UPDATE_PAGO_CUOTAS:
            nextState = {
                ...state,
                pagoCuotas: state.pagoCuotas.map((pagoCuota) =>
                pagoCuota.id === action.id ? action.data : pagoCuota
                )
            }
            break;
        case TypeActions.DELETE_PAGO_CUOTAS:
            nextState = {
                ...state,
                pagoCuotas: state.pagoCuotas.filter((pagoCuota) => pagoCuota.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;