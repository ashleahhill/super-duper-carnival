import React, { PropTypes } from 'react';
import { map, uniqueId } from 'lodash';
import cx from 'classnames';

import Button from './../Button';
import ClockCircle from './ClockCircle';
import s from './ForecastDay.scss';
import { SmallWeatherCard } from './../WeatherCard';
import Weather from './../Weather';

class ForecastDay extends React.Component {
  static propTypes = {
    forecasts: PropTypes.arrayOf(PropTypes.any),
    length: PropTypes.number
  };

  /**
   * Blank 'forecast' used for padding
   *
   * @static
   *
   * @memberOf ForecastDay
   */
  static blankForecast = {
    _blank: true
  }

  /**
   * Get the hour out of a time. Used to get first hour
   *
   * @static
   * @param {any} firstHour
   * @returns
   *
   * @memberOf ForecastDay
   */
  static parseFirstHour(firstHour) {
    return (new Date(firstHour * 1000)).getHours();
  }

  constructor(props) {
    super(props);

    this.state = {
      night: (this.firstHour > 11)
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  get buttonText() {
    return (this.state.night) ? 'PM' : 'AM';
  }

  get buttonTitle() {
    return (this.state.night) ? 'See AM' : 'See PM';
  }

  get dayForecasts() {
    return this.paddedForecasts.slice(0, 12);
  }

  get nightForecasts() {
    return this.paddedForecasts.slice(12, 24);
  }

  get colorClass() {
    return (this.state.night) ? s['is-PM'] : s['is-AM'];
  }

  /**
   * In certain cases, the first forecast will not be for 12AM, it will be for the current time.
   * Pad with blanks until the hours will align for the clock
   *
   * @readonly
   *
   * @memberOf ForecastDay

   */
  get paddedForecasts() {

    let diff = this.firstHour;

    // add blanks for the difference
    let forecasts = this.props.forecasts.slice(0, 24 - diff);
    if (diff) {
      for (let i = diff; i > 0; i--) {
        forecasts.unshift(ForecastDay.blankForecast);
      }
    }

    return forecasts;
  }

  get firstHour() {
    if (!this.checkForecasts()) {
      return 0;
    }

    return ForecastDay.parseFirstHour(this.props.forecasts[0].time);
  }

  handleClick(e) {
    e.stopPropagation();

    this.setState({
      night: !this.state.night
    });
  }

  handleRefresh(e) {
    e.stopPropagation();

    this.props.refresh();
  }

  checkForecasts(forecasts) {
    forecasts = forecasts || this.props.forecasts;

    if (!forecasts || !forecasts.length) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.checkForecasts(nextProps.forecasts)) {
      return;
    }

    if(!this.checkForecasts() || nextProps.forecasts[0].time !== this.props.forecasts[0].time ) {
      this.setState({
        night: (ForecastDay.parseFirstHour(nextProps.forecasts[0].time) > 11)
      });
    }
  }

  render() {

    if (!this.checkForecasts()) {
      return null;
    }

    let forecasts;

    if (this.state.night) {
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
          title={this.buttonTitle}>
          <span>{this.buttonText}</span>
        </Button>
        <ClockCircle className={s['time-container']}></ClockCircle>
        <ul className={cx(s['circle-container'], this.colorClass)}>
          {
            map(forecasts, (forecast, i) => {
              if (forecast._blank) {
                return (
                  <li key={uniqueId('forecast-day')}>
                    <div className={`${s['forecast-day__hour']} ${s['forecast-day__blank-hour']}`}>
                      <Button type="raised" className={s['forecast-day__refresh']} title="See Past Hours" onClick={this.handleRefresh}>
                        <i className="material-icons">restore</i>
                      </Button>
                    </div>
                  </li>
                )
              }

              return (
                <li key={uniqueId('forecast-day')}>
                  <SmallWeatherCard weatherData={forecast} className={s['forecast-day__hour']}></SmallWeatherCard>
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
