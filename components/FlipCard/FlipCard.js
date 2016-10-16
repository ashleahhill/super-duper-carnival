import React, { PropTypes } from 'react';
import { map } from 'lodash';

import s from './FlipCard.scss';
import Measure from 'react-measure';

class AbstractFlipCardSide extends React.Component {
  constructor(props, sideName) {
    super(props);

    this.sideName = sideName;
  }

  render() {
    return (
      <div className={this.props.className + ' flip-card__' + this.sideName}>
        {this.props.children}
      </div>
    )
  }
}

export class FlipCardFront extends AbstractFlipCardSide {
  constructor(props) {
    super(props, 'front');
  }
}

export class FlipCardBack extends AbstractFlipCardSide {
  constructor(props) {
    super(props, 'back');
  }
}

class FlipCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      flipped: false,
      dimensionsFront: {},
      dimensionsBack: {}
    }
  }

  handleClick(e) {
    let front = this.props.children.find(value => {
      return value.type == FlipCardFront
    });

    let back = this.props.children.find(value => {
      return value.type == FlipCardFront
    });

    console.log(front.clientHeight);
    this.setState({ flipped: !this.state.flipped });
  }

  get containerStatusClass() {
    return this.state.flipped ? 'flip-card--flipped' : ''
  }

  get cardSize() {
    // if flipped back size

    if (this.state.flipped) {
      return {
        height: this.state.dimensionsBack.height,
        width: this.state.dimensionsBack.width
      }
    } else {
      // if not front size
      return {
        height: this.state.dimensionsFront.height,
        width: this.state.dimensionsFront.width
      }
    }
  }

  static getSide(children, side) {
    return children.find(value => {
      return value.type == ((side === 'front') ? FlipCardFront : FlipCardBack);
    });
  }

  render() {
    let containerClass = `${this.props.className} flip-card ${s['flip-card']}`;
    return (
      <div className={containerClass + ' ' + this.containerStatusClass} onClick={this.handleClick}>
        <div className="flip-card__flipper" style={this.cardSize}>
          <Measure
            onMeasure={(dimensionsFront) => {
              this.setState({ dimensionsFront })
            } }
            >
            {FlipCard.getSide(this.props.children, 'front')}
          </Measure>
          <Measure
            onMeasure={(dimensionsBack) => {
              this.setState({ dimensionsBack })
            }}
            >
            {FlipCard.getSide(this.props.children, 'back')}
          </Measure>
        </div>
      </div>
    );
  }
}


export default FlipCard;
