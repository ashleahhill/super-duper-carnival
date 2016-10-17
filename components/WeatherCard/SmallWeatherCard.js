import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';
import AbstractWeatherCard from './AbstractWeatherCard';
// import s from './SmallWeatherCard.scss';


export class SmallWeatherCard extends AbstractWeatherCard {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="small-card">
        <input type="checkbox" id="1" />
        <label for="1">
          <div class="front">
            <div class="icon">
              <i class="material-icons">cloud_queue</i>
            </div>
          </div>
          <div class="back">
            <div class="temp">
              <div class="current">
                88<sup>°F</sup>
              </div>
            </div>
            <div class="small-details">
              rain 100%
            </div>
          </div>
        </label>
      </div>
    )
  }
}
