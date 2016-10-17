import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Weather from './../Weather';
import ForecastCard from './../ForecastCard';
import s from './ForecastWeek.scss';

class ForecastWeek extends React.Component {
  static propTypes = {
    currently: PropTypes.any,
    forecasts: PropTypes.arrayOf(PropTypes.any).isRequired,
    flexDirection: PropTypes.oneOf(['row', 'column']),
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  };

  get flexDirectionClass () {
    return s[`forecast-week--${this.props.flexDirection}`];
  }

  get forecasts () {
    // this.props.forecasts.pop();

    this.props.forecasts[0] = Object.assign(this.props.forecasts[0], this.props.currently);
    return this.props.forecasts;
  }
  render() {
    return (
      <div className={this.props.className + ' ' + s['forecast-week'] + ' ' + this.flexDirectionClass}>
        {
          map(this.forecasts, (forecast, i) => {
            return (<ForecastCard className={s['forecast-week__day']} key={i} current={forecast} lat={this.props.lat} lng={this.props.lng}></ForecastCard>)
          })
        }
      </div>
    );
  }
}


export default ForecastWeek;
