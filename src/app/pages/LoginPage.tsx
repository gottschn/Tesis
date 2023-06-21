import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import { Actions } from '../../@redux/Auth'
import { HelperRedux } from '../../@redux'
import { UserInit } from '../../types/User'

export const LoginPage = () => {
  const dispatch = HelperRedux.useDispatch()
  const { isLoading, currentUser, error } = HelperRedux.useSelector(state => state.auth)

  const executeLogin =
    ({ username, password }: UserInit) => {
      dispatch(Actions.getLogin(username, password))
    }
  return (
    <>
      <LoginForm
        login={executeLogin}
        data={currentUser.data} 
        error={error.message} 
        loading={isLoading} 
      />
    </>
  )
}

export default LoginPage
