export const FORECAST_ADD = 'Add [Forecast]';
export const FORECAST_REMOVE = 'Remove [Forecast]';
export const FORECAST_ERROR = '[Forecast] Error';
export const FORECAST_RESET = 'Reset [Forecast]';
export const FORECAST_LOADING = 'Loading [Forecast]';

const defaultState = {
  loading: false,
  data:[]
};

export default function forecastReducer (state, action) {
  state = state || defaultState;

  switch (action.state) {
    case FORECAST_LOADING:

      return Object.assign({}, state, {
        loading: true
      });
    case FORECAST_ADD:

      return state.concat([action.payload]);
    case FORECAST_REMOVE:

      return state.filter((value, index) => {
        return index = payload.index;
      });

    case FORECAST_ERROR:
      return state;

    case FORECAST_RESET:

      return state.shift();
    default:
      return state;
  }
}
