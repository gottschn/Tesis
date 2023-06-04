import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    cuotas: [],
    precioCuotas: [],
    alumnos: [],

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
            case TypeActions.GET_CUOTAS:
            nextState = {
                ...state,
                cuotas: []
            }
            break;
        case TypeActions.SET_CUOTAS_STORE:
            nextState = {
                ...state,
                cuotas: action.data
            }
            break;
            case TypeActions.CREATE_CUOTAS:
                nextState = {
                    ...state,
                    cuotas: [...state.cuotas, action.data]
                }
                break;
            case TypeActions.UPDATE_CUOTAS:
                nextState = {
                    ...state,
                    cuotas: state.cuotas.map((cuota) =>
                    cuota.id === action.id ? action.data : cuota
                    )
                }
                break;
            case TypeActions.DELETE_CUOTAS:
                nextState = {
                    ...state,
                    cuotas: state.cuotas.filter((cuota) => cuota.id !== action.data.id),
                }
                break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;