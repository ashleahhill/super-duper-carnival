import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';

class AbstractWeatherCard extends React.Component {

  static propTypes = {
    weatherData: PropTypes.any.isRequired,
    hourly: PropTypes.bool,
    flexDirection: PropTypes.oneOf(['column', 'row'])
  }

  get icon () {
    return this.props.weatherData.icon;
  }
  get currentTemp () {
    return this.props.weatherData.temperature;
  }
  get highTemp () {
    return this.props.weatherData.temperatureMax;
  }
  get lowTemp () {
    return this.props.weatherData.temperatureMin;
  }
  get precip () {
    return {
      percent: this.props.weatherData.precipProbability,
      intensity: this.props.weatherData.precipIntensity,
      type: this.props.weatherData.precipType
    }
  }
  get timestamp () {
    return new Date(this.props.weatherData.time * 1000);
  }
}

export default AbstractWeatherCard;
