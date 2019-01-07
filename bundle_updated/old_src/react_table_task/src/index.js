import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.js';
// import { store } from './store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>, document.getElementById('app'));
