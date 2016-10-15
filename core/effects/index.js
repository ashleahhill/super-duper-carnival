/**
 * Actions that cause side-effects: http://redux.js.org/docs/advanced/AsyncActions.html
 */

import * as darkSkyApi from './../services/darkSky';
import * as forecastActions from './../actions/forecast';
import * as detailActions from './../actions/detail';


/**
 * Gets the current weather, hourly for the day and the next 7 days
 *
 * @export
 * @param {any} latLng
 * @returns
 */
export function fetchForecastFromAPI(latLng) {

  return function (dispatch) {
    dispatch(forecastActions.loadingForecast());

    darkSkyApi.getCurrent(latLng)
      .then(data => {
        dispatch(forecastActions.addForecast(data))
      });
  }
}

/**
 * Gets the daily forecast from the given time
 *
 * @export
 * @param {any} time
 * @param {any} latLng
 * @returns
 */
export function fetchHourlyFromAPI(time, latLng) {

  return function (dispatch) {
    dispatch(detailActions.loadingDetail());

    darkSkyApi.getFuture(time, latLng)
      .then(data => {
        dispatch(detailActions.addDetail(data))
      });
  }
}