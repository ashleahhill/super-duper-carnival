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

    let id = `${action.payload.latitude}-${action.payload.longitude}`;
    return Object.assign({}, state,
      {
        data: {
          [id]: action.payload
        }
      }
    );
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
