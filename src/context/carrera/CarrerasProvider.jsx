import { useState, useContext } from "react";
import CarrerasContext from "./CarrerasContext";
import clientAxios from "../../config/axios/axios";
import PrecioCuoContext from "../../context/precioCuota/PrecioCuoContext";
import React from 'react';

const CarrerasProvider = ({ children }) => {
  const { addPrecioCuo } = useContext(PrecioCuoContext);

  const initialValue = {
    carreras: [],
    currentCarrera: {},
  };

  const [values, setValues] = useState(initialValue);

  const getCarreras = async () => {
    try {
      /* const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      const carreras = resCarreras.data.filter(carr => carr.Eliminado === false);
      const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
      const preciosCuo = resPreciosCuo.data.filter(preCuo => preCuo.Eliminado === false);

      if (resCarreras.status === 200 && carreras
        && resPreciosCuo.status === 200 && preciosCuo) {
        carreras.map(carrera => {
          const preciosCuoCarr = preciosCuo
            .filter(preCuo => preCuo.fkCarrera === carrera.id);
          const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
          carrera.precioCuo = precioCuoAct.monto; */

      const resCarreras = await clientAxios.get(`/carrera/ObtenerTodos`);
      // const resPreciosCuo = await clientAxios.get(`/preciocuota`);

      resCarreras.status === 200 &&
        setValues({ ...values, carreras: resCarreras.data.value });
      // resPreciosCuo.status === 200 && setValues({ ...values, precioCuo: resPreciosCuo.data.value });
    } catch (error) {
      throw error;
    }
  };

  const getCarrera = async (carreraId) => {
    try {
      /* const resCarrera = await clientAxios.get(`/carrera/${carreraId}`);
      const resPreciosCuo = await clientAxios.get(`/preciocuota`);

      if (resCarrera.status === 200 && resCarrera.data
        && resPreciosCuo.status === 200 && resPreciosCuo.data) {

        const preciosCuoCarr = resPreciosCuo.data.filter(preCuo => preCuo.fkCarrera === resCarrera.data.id);
        const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
        resCarrera.data.precioCuo = precioCuoAct.monto;
      } */

      //debugger
      const resCarrera = await clientAxios.get(`carrera/${carreraId}`);
      //const resPreciosCuo = await clientAxios.get(`/preciocuota`);

      setValues({ ...values, currentCarrera: resCarrera.data.value });
    } catch (error) {
      throw error;
    }
  };

  const addCarrera = async (carrera) => {
    try {

      carrera.cantCuotas = parseFloat(carrera.cantCuotas);

      const resNewCarrera = await clientAxios.post(`/carrera`, carrera);
      if (resNewCarrera.status === 201) {
        addPrecioCuo({
          fkCarrera: resNewCarrera.data.id,
          descripcion: resNewCarrera.data.descripcion,
          CantidadCuotas: resNewCarrera.data.CantCuotas,
          Eliminado: false,
        });
        await getCarreras();
      }
    } catch (error) {
      throw error;
    }
  };

  const updateCarrera = async (carrera) => {
    try {
      // Se elimina esta prop debido a que solo existe en front, no la queremos al impactar
      carrera.cantCuotas = parseFloat(carrera.cantCuotas);
      const resUpdateCarrera = await clientAxios.put(`/carrera/${carrera.id}`,carrera);

      if (resUpdateCarrera.status === 200) 
      {
        addPrecioCuo({
          id: resUpdateCarrera.data.id,
          descripcion: resUpdateCarrera.data.descripcion, 
          cantCuotas: resUpdateCarrera.data.CantCuotas,
          Eliminado: false,});
        await getCarreras();
      }
    } catch (error) {
      console.error("Error al actualizar la carrera:", error);
      throw error;
    }
  };

  const deleteCarrera = async (carrera) => {
    try {
      carrera.Eliminado = true;
      const res = await clientAxios.put(`/carrera/${carrera.id}`, carrera);
      res.status === 200 && (await getCarreras());
    } catch (error) {
      throw error;
    }
  };

  const clearCurrentCarrera = () =>
    setValues({ ...values, currentCarrera: {} });

  return (
    <CarrerasContext.Provider
      value={{
        ...values,
        getCarreras,
        getCarrera,
        addCarrera,
        deleteCarrera,
        updateCarrera,
        clearCurrentCarrera,
      }}
    >
      {children}
    </CarrerasContext.Provider>
  );
};

export default CarrerasProvider;
