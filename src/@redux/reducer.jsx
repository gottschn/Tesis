import { TypeActions } from "./types";

const initialState = {
    loading: false,
    carreras: [],

}

const reducer = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case TypeActions.GET_LOADING:
            nextState = {
                ...state,
                loading: true
            }
            break;
        case TypeActions.GET_CARRERAS:
            const dataCarreras = pruebaApi(action.payload)
            nextState = {
                ...state,
                carreras: dataCarreras
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}

function pruebaApi(id) {
    return [
        { id, nombre: 'pingo'}
    ]
}
export default reducer;