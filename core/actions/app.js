import appReducer, * as types from './../reducers/app';

export function setDay(day) {
  return {type: types.DAY_SET, payload: day};
}

export function resetDay() {
  return {type: types.DAY_RESET};
}
