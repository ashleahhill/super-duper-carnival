
import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {uniqueId} from 'lodash';

import ForecastWeek from './../../components/ForecastWeek';
import Link from './../../components/Link';
import Button from './../../components/Button';
import FlipCard, { FlipCardFront, FlipCardBack } from './../../components/FlipCard';
import LoadingSpinner from './../../components/LoadingSpinner';

class WeekPageDisplay extends React.Component {

  constructor(props) {
    super(props)

    this.retry = this.retry.bind(this);
  }

  componentDidMount() {
    document.title = `Weather in Norfolk | 7-day Weather`;
    this.props.getForecast();
  }

  retry () {
    this.props.getForecast();
  }
  render() {
    return (
      <Layout className={s.content}>
        <h2>7-day Weather</h2>
        {
          this.props.loading? <LoadingSpinner></LoadingSpinner> : ''
        }
        {
          this.props.error? <div className={s.retryButton}><Button onClick={this.retry}>Retry</Button></div> : ''
        }
        {
          this.props.weather.map((weatherCity, i) => {
            return (
              <ForecastWeek key={i} currently={weatherCity.currently} forecasts={weatherCity.daily.data} lat={weatherCity.latitude} lng={weatherCity.longitude} />
            );
          })
        }
      </Layout>
    );
  }

}

export default WeekPageDisplay;
