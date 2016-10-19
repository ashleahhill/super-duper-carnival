import React from 'react';
import cx from 'classnames';
import s from './LoadingSpinner.scss';

class LoadingSpinner extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {

    return (
      <div className={cx(s.wrapper, this.props.className)}>
      <div ref={c => (this.root = c)} className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></div>
      </div>
    )
  }
}

export default LoadingSpinner;
