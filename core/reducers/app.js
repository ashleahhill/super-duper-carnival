
export const DAY_SET = 'Set [App Day]';
export const DAY_RESET = 'Reset [App Day]';

const defaultState = {
  currentDay: -1
}

export default function appReducer (state = defaultState, action) {
  switch (action.type) {
    case DAY_SET:
      return Object.assign({
        currentDay: action.payload
      });

    case DAY_RESET:

      return defaultState;
    default:

      return state;
  }
}
