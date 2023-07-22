//import { getCarreras } from "../../domain/carreras";
import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    ciudades: [],
    filter: {
        descripcion: ''
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
        case TypeActions.GET_CIUDADES:
            nextState = {
                ...state,
                ciudades: []
            }
            break;
        case TypeActions.SET_CIUDADES_STORE:
            nextState = {
                ...state,
                ciudades: action.data
            }
            break;
        case TypeActions.CREATE_CIUDADES:
            nextState = {
                ...state,
                ciudades: [...state.ciudades, action.data]
            }
            break;
        case TypeActions.UPDATE_CIUDADES:
            nextState = {
                ...state,
                ciudades: state.ciudades.map((ciudad) =>
                    ciudad.id === action.id? action.data : ciudad
                )
            }
            break;
        case TypeActions.DELETE_CIUDADES:
            nextState = {
                ...state,
                ciudades: state.ciudades.filter((ciudad) => ciudad.id !== action.data.id),
            }
            break;
            case TypeActions.SET_CIUDADES_FILTER_STORE:
            nextState = {
                ...state,
                filter: {
                    descripcion: action.descripcion,
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