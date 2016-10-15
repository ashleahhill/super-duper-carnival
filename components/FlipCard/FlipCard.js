import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './FlipCard.scss';
export class FlipCardBack extends React.Component {
  render() {
    return (
      <div className={this.props.className + ' flip-card__back'}>
        {this.props.children}
      </div>
    )
  }
}

export class FlipCardFront extends React.Component {
  render() {
    return (
      <div className={this.props.className + ' flip-card__front'}>
        {this.props.children}
      </div>
    )
  }
}
class FlipCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state= {
      flipped: false
    }
  }

  handleClick(e) {
    this.setState({flipped: !this.state.flipped});
  }

  get containerStatusClass () {
    return this.state.flipped? 'flip-card--flipped': ''
  }

  render() {
    let containerClass = `${this.props.className} flip-card ${s['flip-card']}`;
    return (
      <div className={containerClass +  ' ' + this.containerStatusClass} onClick={this.handleClick}>
        <div className="flip-card__flipper">
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default FlipCard;
