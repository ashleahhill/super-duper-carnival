import WeatherIdUtil from './../weatherId';

export const DETAIL_ADD = 'Add [Detail]';
export const DETAIL_REMOVE = 'Remove [Detail]';
export const DETAIL_ERROR = '[Detail] Error';
export const DETAIL_RESET = 'Reset [Detail]';
export const DETAIL_LOADING = 'Loading [Detail]';

const defaultState = {
  loading: false,
  data: {}
};

export default function detailReducer (state = defaultState, action) {

  switch (action.type) {
    case DETAIL_LOADING:

      return Object.assign({}, state, {
        loading: true
      })
    case DETAIL_ADD:

      let id = WeatherIdUtil.makeId(action.payload.latitude, action.payload.longitude, action.payload.currently.time);

      let details = Object.assign({}, action.payload);

      delete details.daily;

      let newState = Object.assign({}, state);

      newState.data = Object.assign(newState.data, {
        [id]: details
      });

    return newState;

    case DETAIL_REMOVE:

      return {
        loading: false,
        data: state.data.filter((value, index) => {
          return index = action.payload.index;
        })
      };
    case DETAIL_ERROR:

      return {
        loading: false,
        data: state.data
      }
    case DETAIL_RESET:

      return defaultState;
    default:
      return state;
  }
}
