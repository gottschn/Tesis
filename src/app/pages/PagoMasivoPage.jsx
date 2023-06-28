import '../../app/components/GlobalStyles/css/basePage.css'
import React from 'react';
import PagoMasivoList from '../../components/pagoCuota/base/PagoMasivoList';


export const PagoMasivoPage  = () => {
    return (
        <div className='app'>
            <PagoMasivoList />
        </div>
    );
};

export default PagoMasivoPage;