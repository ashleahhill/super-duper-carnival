export const FORECAST_ADD = 'Add [Forecast]';
export const FORECAST_REMOVE = 'Remove [Forecast]';
export const FORECAST_ERROR = '[Forecast] Error';
export const FORECAST_RESET = 'Reset [Forecast]';
export const FORECAST_LOADING = 'Loading [Forecast]';

const defaultState = {
  loading: false,
  data:{}
};

export default function forecastReducer (state = defaultState, action) {
  switch (action.type) {
    case FORECAST_LOADING:

      return Object.assign({}, state, {
        loading: true
      });
    case FORECAST_ADD:

      let id = `${action.payload.latitude}-${action.payload.longitude}`;
      return Object.assign({}, state,
        {
          data: {
            [id]: action.payload
          }
        }
      );
    case FORECAST_REMOVE:

      return Object.assign({}, state,
      {
        data: state.filter((value, index) => {
          return index = payload.index;
        })
      });

    case FORECAST_ERROR:
      return state;

    case FORECAST_RESET:

      return Object.assign({}, state, {data: state.data.shift()});
    default:
      return state;
  }
}
