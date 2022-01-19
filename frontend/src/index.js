import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
export { default as Navigation } from "./components/Navigation";
export { default as Footer } from "./components/Footer";
export { default as Home } from "./components/Home";
export { default as About } from "./components/About";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <App />

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


