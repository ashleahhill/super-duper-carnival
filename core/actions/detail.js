import detailReducer, * as types from './../reducers/detail';

export function loadingDetail(id) {
  return {type: types.DETAIL_LOADING, payload: id};
}

export function addDetail(detailData) {
  return {type: types.DETAIL_ADD, payload: detailData};
}

export function removeDetail(index) {
  return { type: types.DETAIL_REMOVE, payload: {index}};
}

export function detailReset() {
  return { type: types.DETAIL_RESET};
}

export function detailError(id) {
  return { type: types.DETAIL_ERROR, payload: id};
}
