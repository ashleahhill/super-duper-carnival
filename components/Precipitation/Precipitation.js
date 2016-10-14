import React, { PropTypes } from 'react';

class Precipitation extends React.Component {
  static propTypes = {
    precipProbability: PropTypes.number.isRequired,
    precipIntensity: PropTypes.number,
    precipType: PropTypes.string
  }

  testPrecip () {
    if(!this.props.precipProbability || !this.props.precipIntensity || !this.props.precipType || this.props.precipType.length === 0) {
      return false;
    }
    return true;
  }

  get percent () {
    return +((this.props.precipProbability * 100).toFixed(2))
  }

  get type () {
    return this.props.precipType;
  }
  render() {

    let precipDisplay = <span>{this.percent}% chance of {this.type}</span>;
    let noPrecipDisplay = <span>none</span>;


    return (
      this.testPrecip() ? precipDisplay : noPrecipDisplay
    )
  }
}

export default Precipitation;
