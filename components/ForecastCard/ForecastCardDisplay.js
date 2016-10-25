import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './ForecastCard.scss';

import FlipCard, { FlipCardFront, FlipCardBack } from './../FlipCard';
import Button from './../Button';
import { LargeWeatherCard } from './../WeatherCard';
import ForecastDay from './../ForecastDay';
import LoadingSpinner from './../LoadingSpinner';
import WeatherIdUtil from './../../core/weatherId';


class ForecastCardDisplay extends React.Component {
  static propTypes = {
    current: PropTypes.any.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    hourly: PropTypes.arrayOf(PropTypes.any)
  };

  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  get weatherId() {
    return WeatherIdUtil.makeId(this.props.lat, this.props.lng, this.props.current.time);
  }

  get day() {
    const date = new Date(this.props.current.time * 1000)

    return date.getUTCDay();
  }

  /**
   * Get the hours and flip the card
   *
   * @param {any} e
   *
   * @memberOf ForecastCardDisplay
   */
  handleCardClick(e) {
    // if its the front and there's no hourly data
    if (!this.props.hourly) {
      // get the hourly
      this.props.getHourly(this.weatherId);
    }

    if (this.day === this.props.selectedDay) {
      this.props.setDay(-1);
    } else {
      this.props.setDay(this.day);
    }
  }

  /**
   * For filling in missing hours
   *
   * @param {any} e
   *
   * @memberOf ForecastCardDisplay
   */
  handleRefresh(e) {
    this.props.refreshHourly(this.weatherId);
  }

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.loading ? <LoadingSpinner className={s.loading}></LoadingSpinner> : ''
        }
        {
          this.props.error ? <div className={s.retryButton}><Button className={s.false} onClick={this.handleCardClick}>Retry</Button></div> : ''
        }
        <FlipCard flip={((this.day === this.props.selectedDay) && !!this.props.hourly)} onClick={this.handleCardClick}>
          <FlipCardFront>
            <LargeWeatherCard weatherData={this.props.current} />
          </FlipCardFront>
          <FlipCardBack>
            {
              this.props.hourly ?
                <ForecastDay className={s['forecast-card__back']} refresh={this.handleRefresh} forecasts={this.props.hourly} /> : null
            }
          </FlipCardBack>
        </FlipCard>
      </div>
    );

  }
}


export default ForecastCardDisplay;
