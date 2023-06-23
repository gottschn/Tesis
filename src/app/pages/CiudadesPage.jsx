import React from 'react'
import CiudadList from '../../components/ciudad/base/CiudadList'
import '../../app/components/GlobalStyles/css/basePage.css'

export const CiudadesPage = () => {
  return (
    <>
      <div className='app'>
        <CiudadList />
      </div>
    </>
  )
}


export default CiudadesPage;
