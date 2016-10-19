import React, { PropTypes } from 'react';
import { map, uniqueId } from 'lodash';
import cx from 'classnames';

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

  get flexDirectionClass() {
    return s[`forecast-week--${this.props.flexDirection}`];
  }

  get forecasts() {
    let forecasts = this.props.forecasts.slice(0, 7);
    forecasts[0] = Object.assign(forecasts[0], this.props.currently);
    return forecasts;
  }

  render() {
    if(!this.props.forecasts || !this.props.forecasts.length) {
      return null;
    }

    return (
      <div className={cx(this.props.className, s['forecast-week'], this.flexDirectionClass)}>
        <div className={cx(s.row)}>
          <div className={cx(s.cell, s.currently)}>
            <ForecastCard current={this.forecasts[0]} lat={this.props.lat} lng={this.props.lng}></ForecastCard>
          </div>
        </div>
        <div className={cx(s.row)}>
          {
            map(this.forecasts, (forecast, i) => {
              if (i === 0) {
                return;
              }

              return (
                <div className={cx(s.cell)} key={uniqueId('forecast-week')}>
                  <ForecastCard  current={forecast} lat={this.props.lat} lng={this.props.lng}></ForecastCard>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

// <div className={cx(this.props.className, s['forecast-week'], this.flexDirectionClass)}>
//   <div className={cx(s.row, 'mdl-grid')}>
//     <div className={cx(s.cell, s.currently, 'mdl-cell mdl-cell--12-col')}>
//       <ForecastCard current={this.forecasts[0]} lat={this.props.lat} lng={this.props.lng}></ForecastCard>
//     </div>
//   </div>
//   <div className={cx(s.row, 'mdl-grid')}>
//     {
//       map(this.forecasts, (forecast, i) => {
//         if (i === 0) {
//           return;
//         }

//         return (
//           <div className={cx(s.cell, 'mdl-cell mdl-cell--4-col')} key={uniqueId('forecast-week')}>
//             <ForecastCard  current={forecast} lat={this.props.lat} lng={this.props.lng}></ForecastCard>
//           </div>
//         )
//       })
//     }
//   </div>
// </div>

export default ForecastWeek;
