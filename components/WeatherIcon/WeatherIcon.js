
import React, { PropTypes } from 'react';

// ToDo: Map these values to the one that works with the iconfont
const WEATHER_ICONS = {
  defaultIcon: 'defaultValue',
   'clear-day': 'sun',
   'clear-night': 'clear-night',
   rain: 'rain',
   snow: 'snow',
   sleet: 'sleet',
   wind: 'wind',
   fog: 'fog',
   cloudy: 'cloudy',
   'partly-cloudy-day': 'partly-cloudy-day',
   'partly-cloudy-night': 'partly-cloudy-night'
}
class WeatherIcon extends React.Component {
  static propTypes = {
    iconName: PropTypes.string
  };

  get iconValue () {
    return WEATHER_ICONS[this.props.iconName] || WEATHER_ICONS.defaultIcon;
  }
  render() {
    return (
      <span>{this.iconValue}</span>
    );
  }
}

export default WeatherIcon;
