import { TypesActions, AuthUserProps } from './types'

const getStart = () => ({
    type: TypesActions.GET_START
})

const getComplete = () => ({
    type: TypesActions.GET_COMPLETE
})

const getError = (message: string) => ({
    type: TypesActions.GET_ERROR,
    message
})

const getLogin = (username: string, password: string) => ({
    type: TypesActions.GET_LOGIN_USER,
    username,
    password
})

const getLogout = () => ({
    type: TypesActions.GET_LOGOUT_USER
})

const setCurrentUserStore = (data: AuthUserProps | {}) => ({
    type: TypesActions.SET_CURRENT_USER_STORE,
    data
})

const getValidToken = () => ({
    type: TypesActions.GET_VALIDATE_TOKEN
})

export default {
    getStart,
    getComplete,
    getError,
    getLogin,
    getLogout,
    setCurrentUserStore,
    getValidToken
}