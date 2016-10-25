import WeatherIdUtil from './../weatherId';

export const FORECAST_ADD = 'Add [Forecast]';
export const FORECAST_REMOVE = 'Remove [Forecast]';
export const FORECAST_ERROR = '[Forecast] Error';
export const FORECAST_RESET = 'Reset [Forecast]';
export const FORECAST_LOADING = 'Loading [Forecast]';

const defaultState = {
  loading: false,
  data:{},
  error: false
};

export default function forecastReducer (state = defaultState, action) {
  switch (action.type) {
    case FORECAST_LOADING:

      return Object.assign({}, state, {
        loading: true
      });
    case FORECAST_ADD:

      let id = WeatherIdUtil.makeId(action.payload.latitude, action.payload.longitude);

      let newState = Object.assign({}, state);

      newState.data = Object.assign(newState.data, {
        [id]: action.payload
      });

      newState.loading = false;
      newState.error = false;

      return newState;

    case FORECAST_REMOVE:

      return Object.assign({}, state,
      {
        data: state.filter((value, index) => {
          return index = action.payload.index;
        })
      });

    case FORECAST_ERROR:

      return Object.assign({}, state, {
        error: true,
        loading: false
      });

    case FORECAST_RESET:

      return Object.assign({}, state, {data: state.data.shift()});
    default:
      return state;
  }
}
