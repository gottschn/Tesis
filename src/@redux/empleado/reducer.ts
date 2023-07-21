import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    empleados: [],
    filter: {
        dni: '',
        apynom: '',
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
            case TypeActions.GET_EMPLEADOS:
            nextState = {
                ...state,
                empleados: []
            }
            break;
        case TypeActions.SET_EMPLEADOS_STORE:
            nextState = {
                ...state,
                empleados: action.data
            }
            break;
            case TypeActions.CREATE_EMPLEADOS:
            nextState = {
                ...state,
                empleados: [...state.empleados, action.data]
            }
            break;
        case TypeActions.UPDATE_EMPLEADOS:
            nextState = {
                ...state,
                empleados: state.empleados.map((empleado) =>
                empleado.id === action.id ? action.data : empleado
                )
            }
            break;
        case TypeActions.DELETE_EMPLEADOS:
            nextState = {
                ...state,
                empleados: state.empleados.filter((empleado) => empleado.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;