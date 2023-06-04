//import { getCarreras } from "../../domain/carreras";
import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    carreras: [],

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
        case TypeActions.GET_CARRERAS:
            nextState = {
                ...state,
                carreras: []
            }
            break;
        case TypeActions.SET_CARRERAS_STORE:
            nextState = {
                ...state,
                carreras: action.data
            }
            break;
        case TypeActions.CREATE_CARRERAS:
            nextState = {
                ...state,
                carreras: [...state.carreras, action.data]
            }
            break;
        case TypeActions.UPDATE_CARRERAS:
            nextState = {
                ...state,
                carreras: state.carreras.map((carrera) =>
                    carrera.id === action.id ? action.data : carrera
                )
            }
            break;
        case TypeActions.DELETE_CARRERAS:
            nextState = {
                ...state,
                carreras: state.carreras.filter((carrera) => carrera.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }

    return nextState;
}
export default reducer;