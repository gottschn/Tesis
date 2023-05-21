import { useState } from 'react';
import PrecioCuoContext from './PrecioCuoContext';
import clientAxios from '../../config/axios/axios';
import React from 'react';

const PrecioCuoProvider = ({ children }) => {

    const initialValue = {
        preciosCuo: [],
        currentPrecioCuo: {}
    }

    const [values, setValues] = useState(initialValue);

    const getPreciosCuo = async () => {
        try {
            const res = await clientAxios.get(`/preciocuota`);
            res.status === 200 && setValues({
                ...values,
                preciosCuo: res.data
            });
        } catch (error) {
            throw error;
        }
    }

    const getPreciosCuoByCarrId = async carrId => {
        try {
            /* const res = await clientAxios.get(`/preciocuota`);
            res.status === 200 && setValues({
                ...values,
                preciosCuo: res.data.filter(preCuo => preCuo.fkCarrera === carrId && preCuo.Eliminado === false)
            }); */
            const res = await clientAxios.get(`/preciocuota/ObtenerPorCarreraId`);
            console.log('a ver si funciona esta poronga...', res.data )
             res.status === 200 && setValues({ ...values, preciosCuo: carrId.value });
          
        } catch (error) {
            throw error;
        }
    }

    const getPrecioCuo = async precioCuoId => {
        try {
            const res = await clientAxios.get(`/preciocuota/${precioCuoId}`);
            res.status === 200 && setValues({ ...values, currentPrecioCuo: res.data });
        } catch (error) {
            throw error;
        }
    }

    const getPrecioCuoActCarr = async carrId => {
        try {
            // Sin uso por el momento... verif funcionamiento
            const resPreciosCuo = await clientAxios.get(`/preciocuota`, carrId);
            resPreciosCuo.status === 200 && resPreciosCuo.data && setValues({...values,currentPrecioCuo: resPreciosCuo.data.value });
                /* const preciosCuoCarr = resPreciosCuo.data.filter(preCuo => preCuo.fkCarrera === carrId && preCuo.Eliminado === false);
                const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];  */
                /* setValues({
                    ...values,
                    currentPrecioCuo: precioCuoAct
                }); */
                
            
        } catch (error) {
            throw error;
        }
    }

    const addPrecioCuo = async precioCuo => {
        try {
            precioCuo.Eliminado = false;
            const res = await clientAxios.post(`/preciocuota`, precioCuo);
            res.status === 201 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    const updatePrecioCuo = async precioCuo => {
        try {
            const res = await clientAxios.put(`/preciocuota/${precioCuo.id}`, precioCuo);
            res.status === 200 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    const deletePrecioCuo = async precioCuo => {
        try {
            precioCuo.Eliminado = true;
            const res = await clientAxios.put(`/preciocuota/${precioCuo.id}`, precioCuo);
            res.status === 200 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    return (
        <PrecioCuoContext.Provider value={{
            ...values,
            getPreciosCuo,
            getPreciosCuoByCarrId,
            getPrecioCuo,
            getPrecioCuoActCarr,
            addPrecioCuo,
            deletePrecioCuo,
            updatePrecioCuo
        }}>
            {children}
        </PrecioCuoContext.Provider>
    );
};

export default PrecioCuoProvider;