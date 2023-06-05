import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
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
            case TypeActions.GET_ALUMNOS:
            nextState = {
                ...state,
                alumnos: []
            }
            break;
        case TypeActions.SET_ALUMNO_STORE:
            nextState = {
                ...state,
                alumnos: action.data
            }
            break;
            case TypeActions.CREATE_ALUMNOS:
            nextState = {
                ...state,
                alumnos: [...state.alumnos, action.data]
            }
            break;
        case TypeActions.UPDATE_ALUMNOS:
            nextState = {
                ...state,
                alumnos: state.alumnos.map((alumno) =>
                alumno.id === action.id ? action.data : alumno
                )
            }
            break;
        case TypeActions.DELETE_ALUMNOS:
            nextState = {
                ...state,
                alumnos: state.alumnos.filter((alumno) => alumno.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;