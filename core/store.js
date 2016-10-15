// http://redux.js.org/docs/advanced/AsyncActions.html

import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from './reducers';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const env = process.env.NODE_ENV;
let reduxMiddleware = [
  thunkMiddleware // lets us dispatch() functions
];

if (env === 'development') {
  const loggerMiddleware = createLogger(); // neat middleware that logs actions
  reduxMiddleware.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...reduxMiddleware)
);

export default store;
