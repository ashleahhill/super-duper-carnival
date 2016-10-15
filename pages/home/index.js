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

import { map } from 'lodash';
import Weather from './../../components/Weather';
import ForecastWeek from './../../components/ForecastWeek';
import ForecastDay from './../../components/ForecastDay';
import { weatherForDay, weatherForCurrent, weatherForHour } from './../../components/Weather/fixtures';
import { fetchForecastFromAPI, fetchHourlyFromAPI } from './../../core/effects';

export class HomePageDisplay extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleCount = this.handleCount.bind(this);
    this.handleGetDetail = this.handleGetDetail.bind(this);
  }

  componentDidMount() {
    document.title = title;

    this.props.onGetForecast();

    this.props.getWeatherDetail(1476504000);
  }

  handleCount(e) {
    e.preventDefault();
    this.props.onCountClick();
  }

  handleGetDetail(e) {
    e.preventDefault();
    this.props.getWeatherDetail(1476504000);
  }
  render() {
    return (
      <Layout className={s.content}>
        <button onClick={this.handleCount}>Click Me: {this.props.count}</button>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className={s.weather__row}>
          <Weather className={s.weather__tile} weatherData={weatherForDay}></Weather>
          <Weather className={s.weather__tile} weatherData={weatherForHour} hourly></Weather>
          <Weather className={s.weather__tile} weatherData={Object.assign(weatherForCurrent, weatherForDay)}></Weather>
        </div>
        <h4>7-day Weather</h4>
          {
            this.props.weather.map((weatherCity, i) => {
              return (
                  <ForecastWeek className={s.weather__row} key={i} forecasts={weatherCity.daily.data} />
              );
            })
          }
        <h4>Hourly Weather</h4>
        {
            this.props.detail.map((weatherDay, i) => {
              return (
                <ForecastDay className={s.weather__row} key={i} forecasts={weatherDay.hourly.data} />
              );
            })
        }
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
};

const displayWeather = (forecasts) => {
  const displayArray = map(forecasts, (value, key) => {
    return value;
  });

  return displayArray;
};

const displayDetail = (details) => {
  const displayArray = map(details, (value, key) => {
    return value;
  });

  return displayArray;
};
const mapStateToProps = (state) => {
  return {
    count: displayStore(state.count),
    weather: displayWeather(state.forecasts.data),
    detail: displayDetail(state.details.data),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCountClick: () => {
      dispatch({ type: 'COUNT' });
    },
    onGetForecast: () => {
      dispatch(fetchForecastFromAPI());
    },
    getWeatherDetail: (time) => {
      dispatch(fetchHourlyFromAPI(time));
    },
  };
};

import { connect } from 'react-redux';

const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageDisplay);

export default HomePage;
