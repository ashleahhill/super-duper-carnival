import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';
import AbstractWeatherCard from './AbstractWeatherCard';
import { uniqueId } from 'lodash';

import s from './SmallWeatherCard.scss';


export default class SmallWeatherCard extends AbstractWeatherCard {

  constructor(props) {
    super(props);
  }

  render() {
    let inputId = uniqueId('small-weather');
    return (
      <div className={s['small-weather-card']}>
        <input type="checkbox" id={inputId} />
        <label htmlFor={inputId}>
          <div className={s['front']}>
            <div className={s.icon}>
              <WeatherIcon className={s['icon__el']} iconName={this.icon}></WeatherIcon>
            </div>
          </div>
          <div className={s['back']}>
            <div className={s['temperature']}>
              <Temperature className={s.line} temp={this.currentTemp} className={s.current}></Temperature>
            </div>
            <div className={s['small-details']}>
              <Precipitation precipProbability={this.precip.percent} precipIntensity={this.precip.intensity} precipType={this.precip.type}></Precipitation>
            </div>
          </div>
        </label>
      </div>
    )
  }
}
