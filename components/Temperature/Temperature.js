import React, { PropTypes } from 'react';


const SCALE_SYMBOLS = {
  c: '&#x2103;',
  f: '&#x2109;'
}

const convert = function (temp) {
  // T(°C) = (T(°F) - 32) × 5/9

  return (temp - 32) * 5/9;
}

class Temperature extends React.Component{
  static propTypes = {
    temp: PropTypes.number.isRequired,
    degrees: PropTypes.string
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
      return SCALE_SYMBOLS[this.props.degrees? this.props.degrees.toLowerCase(): 'f'];
  }
  render() {
    return (
      <span>{this.temperature} {this.scaleSymbol}</span>
    )
  }
}

export default Temperature;
