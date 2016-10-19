
import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';


import WeekPageDisplay from './week-page';
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
    loading: state.forecasts.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForecast: (latLng) => {
      dispatch(fetchForecastFromAPI(latLng));
    }
  };
};

const WeekPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekPageDisplay)

export default WeekPage;
