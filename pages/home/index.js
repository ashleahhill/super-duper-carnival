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
import s from './styles.css';


export default class HomePageDisplay extends React.Component {

  componentDidMount() {
    document.title = 'Norfolk Weather App';
  }

  render() {
    return (
      <Layout className={s.content}>
        <PostcardText className={s['postcard-text']} displayText="Norfolk"></PostcardText>
        <h1>Welcome</h1>
        <Link className="mdl-button mdl-button--raised" to="/forecast/23510">Weekly Forecast</Link>
      </Layout>
    );
  }
}
