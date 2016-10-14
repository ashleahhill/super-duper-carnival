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
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

import Weather from './../../components/Weather';
import { weatherForDay, weatherForCurrent, weatherForHour } from './../../components/Weather/fixtures';

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className={s['weather__row']}>
          <Weather className={s['weather__tile']} weatherData={weatherForDay}></Weather>
          <Weather className={s['weather__tile']} weatherData={weatherForHour} hourly={true}></Weather>
          <Weather className={s['weather__tile']} weatherData={Object.assign(weatherForCurrent, weatherForDay)}></Weather>
        </div>
        <h4>Articles</h4>
        <ul>
        <li>test</li>
          {this.props.articles.map((article, i) =>
            <li key={i}><a href={article.url}>{article.title}</a> by {article.author}</li>
          )}
        </ul>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

}

export default HomePage;
