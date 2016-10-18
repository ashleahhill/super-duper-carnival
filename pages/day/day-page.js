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
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

import ForecastDay from './../../components/ForecastDay';
import FlipCard, { FlipCardFront, FlipCardBack } from './../../components/FlipCard';

class WeekPageDisplay extends React.Component {

  componentDidMount() {
    document.title = title;

    this.props.getForecast();
  }

  render() {
    if (!this.props.weather.length) {
      return null;
    }
    let weather = this.props.weather[0];
    let {currently, latitude, longitude, hourly} = weather;
    let forecast = weather.daily.data[0];

    return (
      <Layout className={s.content}>
        <ForecastDay className={s['forecast-card__back']} forecasts={hourly.data} />
      </Layout>
    );
  }

}

export default WeekPageDisplay;
