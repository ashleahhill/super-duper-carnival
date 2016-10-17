import React, { PropTypes } from 'react';
import cx from 'classnames';

import s from './PostcardText.scss';

class PostcardText extends React.Component {

  static propTypes = {
    displayText: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.setFontSize = this.setFontSize.bind(this)
  }

  componentDidMount () {
    this.setFontSize();
  }

  debugSize (scale, maxW, newWidth, maxH, newHeight, width, height) {
    // logs
    console.log('scale:', scale);
    console.log('maxW', maxW);
    console.log(newWidth);
    console.log('maxH:', maxH);
    console.log(newHeight);
  }

// http://stackoverflow.com/a/21588583
setFontSize() {

  const maxH = this._container.clientHeight,
      maxW = this._container.clientWidth,
      width = this._el.clientWidth,
      height = this._el.clientHeight;
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

  this.debugSize(scale, maxW, newWidth, maxH, newHeight, width, height);

  // set values
  this._el.style.width = newWidth;
  this._el.style.height = newHeight;
  this._el.style.fontSize = newHeight;
}

  get text () {
    return this.props.displayText;
  }

  render() {
    return (
      <div
        className={cx(s['postcard-text'], this.props.className)}
        ref={(c) => this._container = c}>
        <div className={s.title} ref={(c) => this._el = c}>
          <div className={s.city} data-text={this.text}>
            <span className={s.word}>{this.text}</span>
            <span className={s.shadow} data-text={this.text}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default PostcardText;
