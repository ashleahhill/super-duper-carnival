import React, { PropTypes } from 'react';
import s from './Temperature.scss';

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
    precision: PropTypes.number,
    degrees: React.PropTypes.oneOf(['C', 'F', 'c', 'f', 'celcius', 'farenheit', 'Celcius', 'Farenheit'])
  }
  get temperature () {
    let temp = this.props.temp;
    if (this.props.degrees && this.props.degrees.charAt(0).toLowerCase() === 'c') {
      temp = convert(temp);
    }
    if (this.props.precision) {
      temp = +temp.toFixed(this.props.precision);
    } else {
      temp = Math.round(temp);
    }

    return temp;
  }

  get scaleSymbol () {
      return SCALE_SYMBOLS[this.props.degrees? this.props.degrees.charAt(0).toLowerCase(): 'f'];
  }

  render() {
    return (
      <span className={this.props.className}>{this.temperature}<sup className={s.sup}>{this.scaleSymbol}</sup></span>
    )
  }
}

export default Temperature;
