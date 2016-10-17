import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Button from './../Button';
import ClockCircle from './ClockCircle';
import s from './ForecastDay.scss';
import {SmallWeatherCard} from './../WeatherCard';
import Weather from './../Weather';

class ForecastDay extends React.Component {
  static propTypes = {
    forecasts: PropTypes.arrayOf(PropTypes.any),
    length: PropTypes.number
  };


  render() {

    if (!this.props.forecasts) {
      return null;
    }
    let length = this.props.length || 12;

    let forecasts = this.props.forecasts.slice(0,length);
                  // <Weather key={i} weatherData={forecast} hourly={true} flexDirection="row" className={s['forecast-day__hour']}></Weather>

    return (
      <div className={this.props.className + ' ' + s['forecast-day']}>
        <Button
          className={s['clock-button'] + ' ' + s.centered + ' ' + s.clickable}
          type="fab"
          >
          <span>PM</span>
        </Button>
        <ClockCircle className={s['time-container']}></ClockCircle>
        <ul className={s['circle-container']}>
          {
            map(forecasts, (forecast, i) => {
              return (
                <li>
                  <SmallWeatherCard key={i} weatherData={forecast} className={s['forecast-day__hour']}></SmallWeatherCard>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}


export default ForecastDay;
