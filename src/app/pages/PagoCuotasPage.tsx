import React from 'react'; 


import CuotaList from '../../components/cuota/base/CuotaList';
import '../../app/components/GlobalStyles/css/basePage.css'


export const PagoCuotasPage = () => {


    return (
        <>
            <div className='app'>
                <CuotaList />     
            </div>
        </>
    );
};

export default PagoCuotasPage;