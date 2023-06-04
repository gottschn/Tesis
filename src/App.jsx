import React from 'react';
import "./App.css";
import { Provider } from "react-redux";
import { getStore } from "./@redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Home } from "./pages/Home";
import { CarrerasPage } from "./pages/CarrerasPage";
import { AlumnosPage } from "./pages/AlumnosPage";
import { PagoCuotasPage } from "./pages/PagoCuotasPage";
import { PrecioCuotasPage } from "./pages/PrecioCuotasPage";
import ParentContext from "./context/ParentContext";
import { PagoPage } from './pages/PagoPage';


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
              <Route path='/cuota' element={<PagoCuotasPage />} />
              <Route path='/pago' element={<PagoPage />} />
              <Route path='/precioCuota' element={<PrecioCuotasPage />} />
            </Routes>
          </Layout>
      </ParentContext>
    </Provider>
    </>
  );
}

export default App;
