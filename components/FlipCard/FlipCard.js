import React, { PropTypes } from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import s from './FlipCard.scss';
import Measure from 'react-measure';

/**
 * Base for FlipCard side components
 *
 * @abstract
 * @class AbstractFlipCardSide
 * @extends {React.Component}
 */
class AbstractFlipCardSide extends React.Component {
  /**
   * Creates an instance of AbstractFlipCardSide.
   *
   * @param {any} props
   * @param {any} sideName
   *
   * @memberOf AbstractFlipCardSide
   */
  constructor(props, sideName) {
    super(props);

    this.sideName = sideName;
  }

  /**
   *
   *
   * @returns Flip Card template
   *
   * @memberOf AbstractFlipCardSide
   */
  render() {
    return (
      <div className={this.props.className + ' flip-card__' + this.sideName}>
        {this.props.children}
      </div>
    )
  }
}

/**
 * Front of the Flip Card
 *
 * @export
 * @class FlipCardFront
 * @extends {AbstractFlipCardSide}
 */
export class FlipCardFront extends AbstractFlipCardSide {
  /**
   * Creates an instance of FlipCardFront.
   *
   * @param {any} props
   *
   * @memberOf FlipCardFront
   */
  constructor(props) {
    super(props, 'front');
  }
}

/**
 * Back of the Flip card
 *
 * @export
 * @class FlipCardBack
 * @extends {AbstractFlipCardSide}
 */
export class FlipCardBack extends AbstractFlipCardSide {
  /**
   * Creates an instance of FlipCardBack.
   *
   * @param {any} props
   *
   * @memberOf FlipCardBack
   */
  constructor(props) {
    super(props, 'back');
  }
}

/**
 * Wraps content for a flip card
 *
 * @example
 *
 * ```
 * <FlipCard>
 *  <FlipCardFront>
 *    Front Content
 *  </FlipCardFront>
 *  <FlipCardBack>
 *    Back Content
 *  </FlipCardBack>
 * </FlipCard>
 * ```
 *
 * @class FlipCard
 * @extends {React.Component}
 */
class FlipCard extends React.Component {

  /**
   * Rounded - determines if card is rounded
   *
   * @static
   *
   * @memberOf FlipCard
   */
  static propTypes = {
    rounded: PropTypes.bool,
    flip: PropTypes.bool,
    onClick: PropTypes.func
  }

  /**
   * Helper function for finding the front and back elements
   *
   * @static
   * @param {any} children
   * @param {any} side
   * @returns
   *
   * @memberOf FlipCard
   */
  static getSide(children, side) {
    return children.find(value => {
      return value.type == ((side === 'front') ? FlipCardFront : FlipCardBack);
    });
  }

  /**
   * Creates an instance of FlipCard.
   *
   * @param {any} props
   *
   * @memberOf FlipCard
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      flipped: this.props.flip,
      dimensionsFront: {},
      dimensionsBack: {}
    }
  }

  /**
   * Flips card by settign state
   *
   * @param {any} e
   *
   * @memberOf FlipCard
   */
  handleClick(e) {
    e.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick(e);
      return;
    }
    this.setState({ flipped: !this.state.flipped });
  }

  /**
   * className that flips the card
   *
   * @readonly
   *
   * @memberOf FlipCard
   */
  get containerStatusClass() {
    return this.state.flipped ? 'flip-card--flipped' : ''
  }

  /**
   * measurement of the card sides so that cards with sides of two different sides can 'grow'
   *
   * @readonly
   *
   * @memberOf FlipCard
   */
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

  /**
   * Class that rounds the card edges. you ususally can't see the actual card, but hopefully this controlls the hit area
   *
   * @readonly
   *
   * @memberOf FlipCard
   */
  get roundedClass () {
    return this.props.rounded ? 'flip-card--rounded' : ''
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.flip !== this.props.flip ) {
      this.setState({
        flipped: nextProps.flip
      });
    }
  }

  /**
   * Flip card template
   *
   * @returns
   *
   * @memberOf FlipCard
   */
  render() {
    // let containerClass = `${this.props.className} flip-card ${this.containerStatusClass} `;
    let containerClass = cx(this.props.className, 'flip-card', this.containerStatusClass, this.roundedClass);
    return (
      <div className={containerClass} onClick={this.handleClick}>
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
