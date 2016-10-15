import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Weather from './../Weather';

class ForecastWeek extends React.Component {
  static propTypes = {
    forecasts: PropTypes.arrayOf(PropTypes.any).isRequired
  };


  render() {
    return (
      <div className={this.props.className}>
        {
          map(this.props.forecasts, (forecast, i) => {
            return (<Weather key={i} weatherData={forecast}></Weather>)
          })
        }
      </div>
    );
  }
}


export default ForecastWeek;
