import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './ForecastDay.css';
import z from './ForecastDay.scss';
import Weather from './../Weather';

class ForecastDay extends React.Component {
  static propTypes = {
    forecasts: PropTypes.arrayOf(PropTypes.any).isRequired,
    length: PropTypes.number
  };


  render() {
    let length = this.props.length || 10;

    let forecasts = this.props.forecasts.slice(0,length);

    return (
      <div className={this.props.className + ' ' + s['forecast-day']}>
        <span className={z['test-2']}>Test</span>
        {
          map(forecasts, (forecast, i) => {
            return (<Weather key={i} weatherData={forecast} hourly={true}></Weather>)
          })
        }
      </div>
    );
  }
}


export default ForecastDay;
