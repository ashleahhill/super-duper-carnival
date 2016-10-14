import React, { PropTypes } from 'react';


const SCALE_SYMBOLS = {
  c: '°C',
  f: '°F'
}

const convert = function (temp) {
  // T(°C) = (T(°F) - 32) × 5/9

  return (temp - 32) * 5/9;
}

class Temperature extends React.Component{
  static propTypes = {
    temp: PropTypes.number.isRequired,
    degrees: React.PropTypes.oneOf(['C', 'F', 'c', 'f', 'celcius', 'farenheit', 'Celcius', 'Farenheit'])
  }
  get temperature () {
    let temp = this.props.temp;
    if (this.props.degrees && this.props.degrees.charAt(0).toLowerCase() === 'c') {
      temp = convert(temp);
    }
    temp = +temp.toFixed(2);
    return temp;
  }

  get scaleSymbol () {
      return SCALE_SYMBOLS[this.props.degrees? this.props.degrees.charAt(0).toLowerCase(): 'f'];
  }
  render() {
    return (
      <span className={this.props.className}>{this.temperature} {this.scaleSymbol}</span>
    )
  }
}

export default Temperature;
