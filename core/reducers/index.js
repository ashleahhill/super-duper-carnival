import { combineReducers } from 'redux'

import detailReducer  from './detail';
import forecastReducer from './forecast';
import countReducer from './count';

export const rootReducer = combineReducers({
  details: detailReducer,
  forecasts: forecastReducer,
  count: countReducer
})
