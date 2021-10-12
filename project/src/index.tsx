import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import {mockOffers} from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <App offers={mockOffers} />
  </React.StrictMode>,
  document.getElementById('root'));
