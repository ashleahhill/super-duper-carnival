/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from './../../components/Layout';
import Link from './../../components/Link';
import LogoText from './../../components/LogoText';
import cx from 'classnames';
import s from './styles.css';


export default class HomePageDisplay extends React.Component {

  componentDidMount() {
    document.title = 'Weather in Norfolk';
  }

  render() {
    return (
      <Layout className={s.content} header={false}>
        <div className={s.spacer}></div>
        <div className={s.wrapper}>
          <Link to="/forecast/23510" className='logo'><LogoText secondLine="Norfolk" scale={0.8} className={s.testWrapper}></LogoText></Link>
          <Link className={cx(s.button, "mdl-button mdl-button--raised mdl-button--colored")} to="/forecast/23510">Weekly Forecast</Link>
        </div>
        <div className={s.spacer}></div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div className={s.spacer}></div>
      </Layout>
    );
  }
}
