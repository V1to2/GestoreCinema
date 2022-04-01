import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter } from "react-router-dom"


ReactDOM.render(

  <StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </StrictMode >,
  document.getElementById('root')
);

reportWebVitals();

