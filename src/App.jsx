import "./App.css";
import { Provider } from "react-redux";
import { getStore } from "./@redux";
import { getCarreras } from "./@redux/actions";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Home } from "./pages/Home";
import { CarrerasPage } from "./pages/CarrerasPage";
import { AlumnosPage } from "./pages/AlumnosPage";
import { PagoCuotasPage } from "./pages/PagoCuotasPage";
import { PrecioCuotasPage } from "./pages/PrecioCuotasPage";
import ParentContext from "./context/ParentContext";
import React from 'react';

function App() {
  return (
    <>
    <Provider store = {getStore()}>
     <ParentContext>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/carreras' element={<CarrerasPage />} />
              <Route path='/alumnos' element={<AlumnosPage />} />
              <Route path='/cuotas' element={<PagoCuotasPage />} />
              <Route path='/preciocuota' element={<PrecioCuotasPage />} />
            </Routes>
          </Layout>
      </ParentContext>
    </Provider>
    </>
  );
}

export default App;
