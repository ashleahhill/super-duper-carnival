import { combineReducers } from 'redux'

import detailReducer  from './detail';
import forecastReducer from './forecast';
import countReducer from './count';
import appReducer from './app';

export const rootReducer = combineReducers({
  details: detailReducer,
  forecasts: forecastReducer,
  app: appReducer,
  count: countReducer
})
