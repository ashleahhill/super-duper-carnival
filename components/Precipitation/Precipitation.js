import React, { PropTypes } from 'react';

class Precipitation extends React.Component {
  static propTypes = {
    precipProbability: PropTypes.number.isRequired,
    precipIntensity: PropTypes.number,
    precipType: PropTypes.string,
    long: PropTypes.bool
  }

  testPrecip() {
    if (!this.props.precipProbability || !this.props.precipIntensity || !this.props.precipType || this.props.precipType.length === 0) {
      return false;
    }
    return true;
  }

  get percent() {
    return +((this.props.precipProbability * 100).toFixed(2))
  }

  get type() {
    return this.props.precipType;
  }

  get longDisplay() {
    let precipDisplay = <span className={this.props.className}>{this.percent}% chance of {this.type}</span>;
    let noPrecipDisplay = <span className={this.props.className}>none</span>;
    return this.testPrecip() ? precipDisplay : noPrecipDisplay;
  }

  get shortDisplay() {
    let precipDisplay = <span className={this.props.className}>{this.type} {this.percent}%</span>;
    return this.testPrecip() ? precipDisplay : null;
  }

  render() {

    return (
      this.props.long ? this.longDisplay : this.shortDisplay
    )
  }
}

export default Precipitation;
