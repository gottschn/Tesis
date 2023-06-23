//import { getCarreras } from "../../domain/carreras";
import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    extensiones: [],
    filter: {
        id: '',
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
        case TypeActions.GET_EXTENSIONES:
            nextState = {
                ...state,
                extensiones: []
            }
            break;
        case TypeActions.SET_EXTENSIONES_STORE:
            nextState = {
                ...state,
                extensiones: action.data
            }
            break;
        case TypeActions.CREATE_EXTENSIONES:
            nextState = {
                ...state,
                extensiones: [...state.extensiones, action.data]
            }
            break;
        case TypeActions.UPDATE_EXTENSIONES:
            nextState = {
                ...state,
                extensiones: state.extensiones.map((extension) =>
                extension.id === action.id? action.data : extension
                )
            }
            break;
        case TypeActions.DELETE_EXTENSIONES:
            nextState = {
                ...state,
                extensiones: state.extensiones.filter((extension) => extension.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }

    return nextState;
}
export default reducer;