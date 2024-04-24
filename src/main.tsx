import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Contacts from "./Pages/Contacts.tsx";
import Login from "./Pages/Login.tsx";
import {credentialsAuthenticate} from "./Config.ts";

const {isLogged, token} = JSON.parse(localStorage.getItem("user") || '{}');

export const App = () => {
    return ( <> { !isLogged || token !== credentialsAuthenticate.token ? <Login/> :  <Contacts/> } </>)
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
