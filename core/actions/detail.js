import detailReducer, * as types from './../reducers';

export function addDetail(detailData) {
  return {type: types.DETAIL_ADD, payload: detailData};
}

export function removeDetail(index) {
  return { type: types.DETAIL_REMOVE, payload: {index}};
}

export function detailReset() {
  return { type: types.DETAIL_RESET};
}
