import { TypesActions, StateProps } from './types'

const initialState: StateProps  = {
    isLoading: false,
    currentUser: {
        success: false,
        data: {
            userId: '',
            firstName: '',
            lastName: '',
            office: null,
            permissions: []
        }
    },
    error: {
        visible: false,
        message: ''
    }
}

const reducer = (state = initialState, action: any = {}) => {
    let nextState: StateProps;

    switch (action.type) {
        case TypesActions.GET_START:
            nextState = {
                ...state,
                isLoading: true
            }
            break;
        case TypesActions.GET_ERROR:
            nextState = {
                ...state,
                error: { visible: true, message: action.message}
            }
            break;
        case TypesActions.GET_COMPLETE:
            nextState = {
                ...state,
                isLoading: false
            }
            break;
        case TypesActions.SET_CURRENT_USER_STORE:
            nextState ={
                ...state,
                currentUser: action.data,
                error: { visible: false, message: '' }
            }
            break;
        default:
            nextState = state
            break;
    }

    return nextState
}

export default reducer;
