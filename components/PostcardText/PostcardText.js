import React, { PropTypes } from 'react';
import cx from 'classnames';
import { debounce } from 'lodash';
import Dimensions from 'react-dimensions';

import s from './PostcardText.scss';

class PostcardTextText extends React.Component {

  static propTypes = {
    displayText: PropTypes.string.isRequired
  }

  /* stylesheets will load after the react dom has rendered, so we need to set the initial styles inline here for the calcuations */

  /**
   * The inital title container styles
   *
   * @static
   *
   * @memberOf PostcardTextText
   */
  static titleContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top'
  };

  /**
   * The inital title styles
   *
   * @static
   *
   * @memberOf PostcardTextText
   */
  static titleStyle = {
    display: 'block',
    fontFamily: '"Bevan", monospace',
    fontSize: '100%',
    lineHeight: '1em',
    position: 'relative'
  };

  /**
   * Creates an instance of PostcardTextText.
   *
   * @param {any} props
   *
   * @memberOf PostcardTextText
   */
  constructor(props) {
    super(props);
    this.state = {
      titleContainerStyle: {}
    }
    this.setFontSize = this.setFontSize.bind(this);
    this.handleResize = debounce(this.setFontSize, 500);
  }

  debugSize (scale, maxW, newWidth, maxH, newHeight, width, height) {
    // logs
    console.log('oldWidth: ', width);
    console.log('oldHeight: ', height)
    console.log('scale:', scale);
    console.log('maxW', maxW);
    console.log('newWidth: ', newWidth);
    console.log('maxH:', maxH);
    console.log('newHeight: ', newHeight);
  }

// http://stackoverflow.com/a/21588583
setFontSize() {

  const maxH = this.props.containerHeight,
      maxW = this.props.containerWidth,
      width = this.elWidth,
      height = this.elHeight;

  let newHeight,
      newWidth,
      scale;

  // set scale
  if ( maxW > maxH ) {
    scale = maxW / width;
    if ( height * scale > maxH ) {
      scale = maxH / height;
    }
  } else {
    scale = maxH / height;
    if ( width * scale > maxW ) {
      scale = maxW / width;
    }
  }

  // calculate with scale
  newWidth = Math.round(width * scale) + 'px';
  newHeight = Math.round(height * scale) + 'px';

  // this.debugSize(scale, maxW, newWidth, maxH, newHeight, width, height);

  this.setState({titleContainerStyle: {
    width: newWidth,
    height: newHeight,
    fontSize: newHeight
  }})
}

/**
 * The title container styles
 *
 * @readonly
 *
 * @memberOf PostcardTextText
 */
  get titleContainerStyle () {
    let {width, height, fontSize} = this.state.titleContainerStyle;
    let {display, position, verticalAlign} = PostcardTextText.titleContainerStyle;
    return {
      display,
      position,
      width,
      height,
      fontSize,
      verticalAlign
    }
  }

/**
 * The title styles
 *
 * @readonly
 *
 * @memberOf PostcardTextText
 */
  get titleStyle () {
    return PostcardTextText.titleStyle;
  }

/**
 * The text to be displayed
 *
 * @readonly
 *
 * @memberOf PostcardTextText
 */
  get text () {
    return this.props.displayText;
  }

  /**
   * After the component mounts, we can set the initial font size
   *
   * Lifecycle hook
   *
   * @memberOf PostcardTextText
   */
  componentDidMount () {
    this.elWidth = this._el.clientWidth,
    this.elHeight = this._el.clientHeight;
    this.setFontSize();
  }

  /**
   * When the parent component (Dimensions component) updates, we update the dimensions
   *
   * Lifecycle hook
   *
   * @memberOf PostcardTextText
   */
  componentWillReceiveProps () {
    this.handleResize();
  }

  /**
   * Renders the component
   *
   * Lifecycle hook
   *
   * @returns
   *
   * @memberOf PostcardTextText
   */
  render() {
    return (
      <div className={cx(s.wrapper, this.props.className)}>
        <div className={cx(s.container)} style={this.titleContainerStyle} ref={(c) => this._el = c}>
          <div className={s.title} style={this.titleStyle}>
            <div className={cx(s.city)} data-text={this.text}>
              <span className={s.word}>{this.text}</span>
              <span className={s.shadow} data-text={this.text}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dimensions({
  className: 'dimensions-container',
  elementResize: true,
  debounce: 500
})(PostcardTextText);
