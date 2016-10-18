import React, { PropTypes } from 'react';
import cx from 'classnames';
import PostcardText from './../PostcardText';
import config from './package.json';
import s from './LogoText.scss';

class LogoText extends React.Component {

  static propTypes = {
    firstLine: PropTypes.string,
    secondLine: PropTypes.string,
    scale: PropTypes.number
  }

  static defaultProps = {
    firstLine: config.logoText.firstLine,
    secondLine: config.logoText.secondLine,
    scale: 1
  }

  static h1Style = {
    fontFamily: 'Lobster, cursive',
    lineHeight:'1em',
    overflow: 'hidden'
  }
  static enRatio = 0.66;
  get fontSize () {
    let percentage = (100 / this.props.secondLine.length);

    return percentage / LogoText.enRatio;

    // return percentage + 'vw';
  }


  render () {

    let fontSize = this.fontSize + 'vw';
    let padding = this.fontSize * 0.25 + 'vw';
    let paddingBottom = this.fontSize * 0.5 + 'vw';
    let style = Object.assign({}, LogoText.h1Style, {
      fontSize,
      padding,
      paddingBottom
    }, this.props.style);


    return (
      <h1 style={style} className={cx(s['logo-text'], this.props.className)}>
        <div className={s.sub}>{this.props.firstLine}</div>
        <div className={s.location} data-text={this.props.secondLine}>
          <span className={s.word}>{this.props.secondLine}</span>
          <span className={s.shadow} data-text={this.props.secondLine}></span>
        </div>
      </h1>
    )
  }
}

export default LogoText;
