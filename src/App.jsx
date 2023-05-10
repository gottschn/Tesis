import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { getStore } from "./@redux";
import { getCarreras } from "./@redux/actions";

function App() {
  return (
    <>
    <Provider store = {getStore()}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {
              console.log(getCarreras())
            }
          </p>
        </header>
      </div>
      </Provider>
    </>
  );
}

export default App;
