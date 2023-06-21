import React from 'react';
import "./App.css";
import { Provider } from "react-redux";
import { getStore } from "./@redux";
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
    <Provider store = {getStore()}>
     <AppRouter/>
    </Provider>
    </>
  );
}

export default App;
