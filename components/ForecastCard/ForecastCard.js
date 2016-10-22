import React, { PropTypes } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import WeatherIdUtil from './../../core/weatherId';


import ForecastCardDisplay from './ForecastCardDisplay';
import { fetchHourlyFromAPI, fetchHourlyIfNeeded } from './../../core/effects';


const detailsHourly = (detailsData, id) => {

  let detail = detailsData[id];
  if (detail) {
    return get(detail, 'hourly.data', []);
  }

  return [];
}

const detailsLoading = (detailsData, id ) => {
  return detailsData[id] ? detailsData[id].loading : false;
}

const detailsError = (detailsData, id ) => {
  return detailsData[id] ? detailsData[id].error : false;
}

const mapStateToProps = (state, props) => {

  const {details} = state;

  const id = WeatherIdUtil.makeId(props.lat, props.lng, props.current.time)

  return {
    hourly: detailsHourly(details.data, id),
    loading: detailsLoading(details.data, id),
    error: detailsError(details.data, id)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHourly: (id) => {
      dispatch(fetchHourlyIfNeeded(id));
    },
    refreshHourly: (id) => {
      let {latLng, time} = WeatherIdUtil.parseId(id);
      dispatch(fetchHourlyFromAPI(time, latLng))
    }
  };
};

const ForecastCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastCardDisplay)


export default ForecastCard;
