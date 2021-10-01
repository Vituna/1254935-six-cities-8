import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const offersNumber = 10;

ReactDOM.render(
  <React.StrictMode>
    <App offersNumber={offersNumber} />
  </React.StrictMode>,
  document.getElementById('root'));
