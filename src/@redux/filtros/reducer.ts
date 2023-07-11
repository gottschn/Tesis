import { StateProps, TypeActions } from "./types";

const initialState: StateProps = {
    isLoading: false,
    filtros: [],
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
            case TypeActions.GET_FILTROS:
            nextState = {
                ...state,
                filtros: []
            }
            break;
        default:
            nextState = state
            break;
    }
    
    return nextState;
}
export default reducer;