import React from 'react'
import '../../app/components/GlobalStyles/css/basePage.css'
import EmpleadoList from '../../components/empleado/base/EmpleadoList';

export const EmpleadosPage = () => {
  return (
    <>
      <div className='app'>
         <EmpleadoList /> 
      </div>
    </>
  )
}


export default EmpleadosPage;
