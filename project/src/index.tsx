import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { offersNumber } from './const';

ReactDOM.render(
  <React.StrictMode>
    <App offersNumber={offersNumber} />
  </React.StrictMode>,
  document.getElementById('root'));
