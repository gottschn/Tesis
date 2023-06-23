//import { getCarreras } from "../../domain/carreras";
import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    usuarios: [],
    filter: {
        id: '',
        nombre: ''
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
        case TypeActions.GET_USUARIOS:
            nextState = {
                ...state,
                usuarios: []
            }
            break;
        case TypeActions.SET_USUARIOS_STORE:
            nextState = {
                ...state,
                usuarios: action.data
            }
            break;
        case TypeActions.CREATE_USUARIOS:
            nextState = {
                ...state,
                usuarios: [...state.usuarios, action.data]
            }
            break;
        case TypeActions.UPDATE_USUARIOS:
            nextState = {
                ...state,
                usuarios: state.usuarios.map((usuario) =>
                    usuario.id === action.id? action.data : usuario
                )
            }
            break;
        case TypeActions.DELETE_USUARIOS:
            nextState = {
                ...state,
                usuarios: state.usuarios.filter((usuario) => usuario.id !== action.data.id),
            }
            break;
        default:
            nextState = state
            break;
    }

    return nextState;
}
export default reducer;