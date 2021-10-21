import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from '../src/store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';

import {mockOffers} from './mocks/offers';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App offers={mockOffers} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
