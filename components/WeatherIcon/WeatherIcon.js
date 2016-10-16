
import React, { PropTypes } from 'react';
import Skycons from 'react-skycons';

// ToDo: Map these values to the one that works with the iconfont
const WEATHER_ICONS = {
  defaultIcon: 'CLEAR_DAY',
   'clear-day': 'CLEAR_DAY',
   'clear-night': 'CLEAR_NIGHT',
   rain: 'RAIN',
   snow: 'SNOW',
   sleet: 'SLEET',
   wind: 'WIND',
   fog: 'FOG',
   cloudy: 'CLOUDY',
   'partly-cloudy-day': 'PARTLY_CLOUDY_DAY',
   'partly-cloudy-night': 'PARTLY_CLOUDY_NIGHT'
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
      <div className={this.props.className}><Skycons color="black" icon={this.iconValue} /></div>
    );
  }
}

export default WeatherIcon;
