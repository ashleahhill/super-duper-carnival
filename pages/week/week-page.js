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

import ForecastWeek from './../../components/ForecastWeek';
import FlipCard, { FlipCardFront, FlipCardBack } from './../../components/FlipCard';

class WeekPageDisplay extends React.Component {

  componentDidMount() {
    document.title = title;

    this.props.getForecast();
  }

  render() {
    return (
      <Layout className={s.content}>
        <h4>7-day Weather</h4>
          {
            this.props.weather.map((weatherCity, i) => {
              return (
                  <ForecastWeek key={i} forecasts={weatherCity.daily.data} lat={weatherCity.latitude} lng={weatherCity.longitude} />
              );
            })
          }
      </Layout>
    );
  }

}

export default WeekPageDisplay;
