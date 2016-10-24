import WeatherIdUtil from './../weatherId';
import {cloneDeep} from 'lodash';

export const DETAIL_ADD = 'Add [Detail]';
export const DETAIL_REMOVE = 'Remove [Detail]';
export const DETAIL_ERROR = '[Detail] Error';
export const DETAIL_RESET = 'Reset [Detail]';
export const DETAIL_LOADING = 'Loading [Detail]';

const defaultState = {
  data: {}
};

function updateDetail(state, id, newData) {
   const newState = cloneDeep(state);

   const oldDetail = newState.data[id] || {};

   newState.data[id] = Object.assign({}, oldDetail, newData);

   return newState;
}

export default function detailReducer (state = defaultState, action) {

  switch (action.type) {
    case DETAIL_LOADING:

      return updateDetail(state, action.payload, {loading: true, error: false});

    case DETAIL_ADD:

      const id = WeatherIdUtil.makeId(action.payload.latitude, action.payload.longitude, action.payload.currently.time);

      let details = Object.assign({}, action.payload);

      delete details.daily;
      details.loading = false;
      details.error = false;

      return updateDetail(state, id, details);

    case DETAIL_REMOVE:

      return {
        data: state.data.filter((value, index) => {
          return index = action.payload.index;
        })
      };
    case DETAIL_ERROR:

      return updateDetail(state, action.payload, {loading: false, error: true});

    case DETAIL_RESET:

      return defaultState;
    default:
      return state;
  }
}
