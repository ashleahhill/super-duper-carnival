/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from './../../components/Layout';
import Link from './../../components/Link';
import s from './styles.scss';
import { title, html } from './index.md';

class AboutPage extends React.Component {

  static initialStyle = {
    textAlign: 'center'
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content} style={AboutPage.initialStyle}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    );
  }

}

export default AboutPage;
