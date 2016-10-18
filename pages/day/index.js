
import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';


import DayPageDisplay from './day-page';
import { fetchForecastFromAPI, fetchHourlyFromAPI } from './../../core/effects';


const displayWeather = (forecasts) => {
  const displayArray = map(forecasts, (value, key) => {
    return value;
  });

  return displayArray;
};

const mapStateToProps = (state) => {
  return {
    weather: displayWeather(state.forecasts.data),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForecast: (latLng) => {
      dispatch(fetchForecastFromAPI(latLng));
    }
  };
};

const DayPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DayPageDisplay)

export default DayPage;
