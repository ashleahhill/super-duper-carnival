import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './ForecastDay.scss';
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
    let length = this.props.length || 24;

    let forecasts = this.props.forecasts.slice(0,length);
    return (
      <div className={this.props.className + ' ' + s['forecast-day']}>
        {
          map(forecasts, (forecast, i) => {
            return (<Weather key={i} weatherData={forecast} hourly={true} flexDirection="row" className={s['forecast-day__hour']}></Weather>)
          })
        }
      </div>
    );
  }
}


export default ForecastDay;
