import React from 'react'
import '../../app/components/GlobalStyles/css/basePage.css'
import ExtensionList from '../../components/extension/base/ExtensionList';

export const ExtensionesPage = () => {
  return (
    <>
      <div className='app'>
        <ExtensionList />
      </div>
    </>
  )
}


export default ExtensionesPage;
