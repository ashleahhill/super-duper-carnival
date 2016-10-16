import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Weather from './../Weather';
import ForecastCard from './../ForecastCard';

class ForecastWeek extends React.Component {
  static propTypes = {
    forecasts: PropTypes.arrayOf(PropTypes.any).isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  };


  render() {
    return (
      <div className={this.props.className}>
        {
          map(this.props.forecasts, (forecast, i) => {
            return (<ForecastCard key={i} current={forecast} lat={this.props.lat} lng={this.props.lng}></ForecastCard>)
          })
        }
      </div>
    );
  }
}


export default ForecastWeek;
