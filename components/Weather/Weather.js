import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';
// import s from './Weather.css';
const s = {};

class Weather extends React.Component {

  static propTypes = {
    weatherData: PropTypes.any.isRequired,
    hourly: PropTypes.bool
  }

  get icon () {
    return this.props.weatherData.icon;
  }
  get currentTemp () {
    return this.props.weatherData.temperature;
  }
  get highTemp () {
    return this.props.weatherData.temperatureMax;
  }
  get lowTemp () {
    return this.props.weatherData.temperatureMin;
  }
  get precip () {
    return {
      percent: this.props.weatherData.precipProbability,
      intensity: this.props.weatherData.precipIntensity,
      type: this.props.weatherData.precipType
    }
  }
  get timestamp () {
    return new Date(this.props.weatherData.time);
  }

  render () {
    return (
      <article className={this.props.className + ' ' + s.weather}>
        <h1><DateDisplay date={this.timestamp} time={this.props.hourly} className={`date__${this.props.hourly? 'time' : 'date'}`}></DateDisplay></h1>
        <WeatherIcon iconName={this.icon}></WeatherIcon>
        {
          this.currentTemp?
          <Temperature temp={this.currentTemp} className={s['temperature--single'] + ' temperature--single'}></Temperature>:
          ''
        }
        {
        (this.highTemp && this.lowTemp)?
          <div>
            <Temperature temp={this.highTemp} className="temperature--high"></Temperature>
            <span className="temperature__seperator">/</span>
            <Temperature temp={this.lowTemp} className="temperature--low"></Temperature>
          </div> :
          ''
        }
        <div>Precipitation: <Precipitation precipProbability={this.precip.percent} precipIntensity={this.precip.intensity} precipType={this.precip.type}></Precipitation></div>
      </article>
    )
  }
}

export default Weather;
