import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './ForecastCard.scss';

import FlipCard, {FlipCardFront, FlipCardBack} from './../FlipCard';
import Weather from './../Weather';
import {LargeWeatherCard} from './../WeatherCard';
import ForecastDay from './../ForecastDay';
import WeatherIdUtil from './../../core/weatherId';


class ForecastCardDisplay extends React.Component {
  static propTypes = {
    current: PropTypes.any.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    hourly: PropTypes.arrayOf(PropTypes.any)
  };

  constructor (props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }
  get weatherId () {
    return WeatherIdUtil.makeId(this.props.lat, this.props.lng, this.props.current.time);
  }

  handleCardClick (e) {
    this.props.getHourly(this.weatherId);
  }

  render() {
    return (
       <FlipCard className={this.props.className + ' ' + s['forecast-card']} >
        <FlipCardFront>
          <div onClick={this.handleCardClick}>
            <LargeWeatherCard weatherData={this.props.current} />
          </div>
        </FlipCardFront>
        <FlipCardBack>
          <ForecastDay className={s['forecast-card__back']} forecasts={this.props.hourly} />
        </FlipCardBack>
      </FlipCard>
    );

  }
}


export default ForecastCardDisplay;
