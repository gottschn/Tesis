import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    pagos: [],
    alumnos: [],
    filter: {
        legajo: '',
    }

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
            case TypeActions.GET_PAGO:
            nextState = {
                ...state,
                pagos: []
            }
            break;
        case TypeActions.SET_PAGO_STORE:
            nextState = {
                ...state,
                pagos: action.data
            }
            break;
            case TypeActions.CREATE_PAGO:
            nextState = {
                ...state,
                pagos: [...state.pagos, action.data]
            }
            break;
        case TypeActions.UPDATE_PAGO:
            nextState = {
                ...state,
                pagos: state.pagos.map((pago) =>
                pago.id === action.id ? action.data : pago
                )
            }
            break;
        case TypeActions.DELETE_PAGO:
            nextState = {
                ...state,
                pagos: state.pagos.filter((pago) => pago.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;