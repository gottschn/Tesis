import React from 'react'
import '../../app/components/GlobalStyles/css/basePage.css'
import UsuarioList from '../../components/usuario/base/UsuarioList';

export const UsuariosPage = () => {
  return (
    <>
      <div className='app'>
        <UsuarioList /> 
      </div>
    </>
  )
}


export default UsuariosPage;
