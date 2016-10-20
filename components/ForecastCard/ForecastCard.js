import React, { PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import WeatherIdUtil from './../../core/weatherId';


import ForecastCardDisplay from './ForecastCardDisplay';
import { fetchHourlyFromAPI, fetchHourlyIfNeeded } from './../../core/effects';


const displayHourly = (detailsData, id) => {
  return detailsData[id] ? detailsData[id].hourly.data : [];
}

const mapStateToProps = (state, props) => {

  const {details} = state;

  const id = WeatherIdUtil.makeId(props.lat, props.lng, props.current.time)

  return {
    hourly: displayHourly(details.data, id),
    loading: details.loading,
    error: details.error
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
