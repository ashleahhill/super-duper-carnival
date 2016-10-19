
import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

import ForecastDay from './../../components/ForecastDay';
import FlipCard, { FlipCardFront, FlipCardBack } from './../../components/FlipCard';

class WeekPageDisplay extends React.Component {

  componentDidMount() {
    document.title = 'Weather in Norfolk | Test Page';

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
