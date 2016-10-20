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

  static blankForecast = {
    _blank: true
  }

  constructor(props) {
    super(props);

    this.state = {
      night: (this.firstHour > 11)
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.checkForecasts()) {
      return;
    }
    this.setState({
      night: (this.firstHour > 11)
    });
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
    return (new Date(this.props.forecasts[0].time * 1000)).getHours();
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

  checkForecasts() {

    if (!this.props.forecasts || !this.props.forecasts.length) {
      return false;
    }
    return true;
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
          title={this.buttonTitle}
          >
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
