import React, { PropTypes } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import WeatherIdUtil from './../../core/weatherId';


import ForecastCardDisplay from './ForecastCardDisplay';
import { fetchHourlyFromAPI, fetchHourlyIfNeeded } from './../../core/effects';
import { setDay } from './../../core/actions/app';

/**
 * The id'd days' hourly data
 */
const detailsHourly = (detailsData, id) => {

  let detail = detailsData[id];
  if (detail) {
    return get(detail, 'hourly.data');
  }

  return;
}

/**
 * The id'd days' loading state
 */
const detailsLoading = (detailsData, id ) => {
  return detailsData[id] ? detailsData[id].loading : false;
}

/**
 * The id'd days' error state
 */
const detailsError = (detailsData, id ) => {
  return detailsData[id] ? detailsData[id].error : false;
}

const mapStateToProps = (state, props) => {

  const {details, app} = state;

  const id = WeatherIdUtil.makeId(props.lat, props.lng, props.current.time)

  return {
    hourly: detailsHourly(details.data, id),
    loading: detailsLoading(details.data, id),
    error: detailsError(details.data, id),
    selectedDay: app.currentDay
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
    },
    setDay: (day) => {
      dispatch(setDay(day));
    }
  };
};

const ForecastCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastCardDisplay)


export default ForecastCard;
