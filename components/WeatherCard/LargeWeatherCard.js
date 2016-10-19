import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';
import AbstractWeatherCard from './AbstractWeatherCard';
import s from './LargeWeatherCard.scss';

export default class LargeWeatherCard extends AbstractWeatherCard {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.card}>
        <div className={s.content}>
          <div className={s.temperature}>
            {
              this.currentTemp?
              <Temperature temp={this.currentTemp} className={s.current + ' ' + s.line}></Temperature>:
              ''
            }
            {
            (this.highTemp && this.lowTemp)?
              <div className={s['high-low']}>
                <Temperature temp={this.highTemp} className={s.line}></Temperature>
                <Temperature temp={this.lowTemp} className={s.line}></Temperature>
              </div> :
              ''
            }
          </div>
          <div className={s.icon}>
            <WeatherIcon className={s['icon__el']} iconName={this.icon}></WeatherIcon>
          </div>
          <div className={s.details}>
            <div className={s.date}>
              <DateDisplay date={this.timestamp}></DateDisplay>
            </div>
            <div className={s.precip}>
              <Precipitation precipProbability={this.precip.percent} precipIntensity={this.precip.intensity} precipType={this.precip.type}></Precipitation>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

