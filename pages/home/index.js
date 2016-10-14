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

export class HomePageDisplay extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount() {
    document.title = title;
  }

  handleCount (e) {
    e.preventDefault();
    this.props.onCountClick();
  }

  render() {
    return (
      <Layout className={s.content}>
        <button  onClick={this.handleCount}>Click Me: {this.props.count}</button>
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


const displayStore = (count) => {
  return count.count;
}

const mapStateToProps = (state) => {
  return {
    count: displayStore(state.count),
    weather: state.forecasts.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCountClick: () => {
      dispatch({type: 'COUNT'})
    }
  }
}

import { connect } from 'react-redux'

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageDisplay)

export default HomePage
