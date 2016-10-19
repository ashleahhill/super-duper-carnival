import React, { PropTypes } from 'react';
import { map, uniqueId } from 'lodash';
import cx from 'classnames';

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

  constructor(props) {
    super(props);

    this.state = {
      night: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();

    this.setState({
      night: !this.state.night
    })
  }

  get buttonText () {
    return (this.state.night)? 'PM' : 'AM';
  }

  get dayForecasts () {
    return this.props.forecasts.slice(0, 12);
  }

  get nightForecasts () {
    return this.props.forecasts.slice(12, 24);
  }

  get colorClass () {
    return (this.state.night)? s['is-PM'] : s['is-AM'];
  }

  render() {

    if (!this.props.forecasts || !this.props.forecasts.length) {
      return null;
    }

    let forecasts;

    if (this.state.night ) {
      forecasts = this.nightForecasts;
    } else {
      forecasts = this.dayForecasts;
    }

    return (
      <div className={cx(this.props.className, s['forecast-day'], this.colorClass)}>
        <Button
          title={`Switch to ${this.buttonText}`}
          className={s['clock-button'] + ' ' + s.centered + ' ' + s.clickable}
          type="fab"
          onClick={this.handleClick}
          >
          <span>{this.buttonText}</span>
        </Button>
        <ClockCircle className={s['time-container']}></ClockCircle>
        <ul className={cx(s['circle-container'], this.colorClass)}>
          {
            map(forecasts, (forecast, i) => {
              return (
                <li key={uniqueId('forecast-day')}>
                  <SmallWeatherCard  weatherData={forecast} className={s['forecast-day__hour']}></SmallWeatherCard>
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
