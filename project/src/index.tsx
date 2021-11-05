import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './components/services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';

import {requireAuthorization} from './store/action';
import {checkAuthAction, fetchHotelsAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {AuthorizationStatus} from './const';
import { rootReducer } from './store/root-reducer';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchHotelsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
