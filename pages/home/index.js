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
import PostcardText from './../../components/PostcardText';
import LogoText from './../../components/LogoText';
import cx from 'classnames';
import s from './styles.css';


export default class HomePageDisplay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      update: 0
    }
  }
  componentDidMount() {
    document.title = 'Weather in Norfolk';
  }

  render() {
    let style = {
      width: '40%',
      height: '100px',
    };
    let style2 = {
      width: '100%'
    }
        // <div className={s.testWrapper} style={style}>
        //    <PostcardText className={s['postcard-text']} displayText="Norfolk"></PostcardText>
        // </div>
    return (
      <Layout className={s.content}>
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
