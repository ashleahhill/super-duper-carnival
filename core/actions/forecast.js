import forecastReducer, * as types from './reducers/forecast';

export function addForecast(forecastData) {
  return {type: types.FORECAST_ADD, payload: forecastData};
}

export function removeForecast(index) {
  return {type: types.FORECAST_REMOVE, payload: {index}};
}

export function resetForecast() {
  return {type: types.FORECAST_RESET};
}
