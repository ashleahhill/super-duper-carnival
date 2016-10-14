export const DETAIL_ADD = 'Add [Detail]';
export const DETAIL_REMOVE = 'Remove [Detail]';
export const DETAIL_ERROR = '[Detail] Error';
export const DETAIL_RESET = 'Reset [Detail]';
export const DETAIL_LOADING = 'Loading [Detail]';

const defaultState = {
  loading: false,
  data: []
};

export default function detailReducer (state, action) {
  state = state || defaultState;

  switch (action.state) {
    case DETAIL_LOADING:

      return Object.assign({}, state, {
        loading: true
      })
    case DETAIL_ADD:

     return {
        loading: false,
        data: state.data.concat([action.payload])
      }

    case DETAIL_REMOVE:

      return {
        loading: false,
        data: state.data.filter((value, index) => {
          return index = payload.index;
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
