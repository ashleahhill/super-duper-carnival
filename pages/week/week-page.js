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
import {uniqueId} from 'lodash';

import ForecastWeek from './../../components/ForecastWeek';
import Link from './../../components/Link';
import FlipCard, { FlipCardFront, FlipCardBack } from './../../components/FlipCard';

class WeekPageDisplay extends React.Component {

  componentDidMount() {
    document.title = `Weather in Norfolk | Weekly Forecast`;
    this.props.getForecast();
  }

  render() {
    return (
      <Layout className={s.content}>
        <h2>7-day Weather</h2>
        {
          this.props.weather.map((weatherCity, i) => {
            return (
                <ForecastWeek key={i} currently={weatherCity.currently} forecasts={weatherCity.daily.data} lat={weatherCity.latitude} lng={weatherCity.longitude} />
            );
          })
        }
        <Link to={`/forecast/${uniqueId()}`}>forecast</Link>
      </Layout>
    );
  }

}

export default WeekPageDisplay;
