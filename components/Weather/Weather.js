import React, { PropTypes } from 'react';
import WeatherIcon from './../WeatherIcon';
import Temperature from './../Temperature';
import Precipitation from './../Precipitation';
import DateDisplay from './../DateDisplay';
import s from './Weather.scss';

class Weather extends React.Component {

  static propTypes = {
    weatherData: PropTypes.any.isRequired,
    hourly: PropTypes.bool,
    flexDirection: PropTypes.oneOf(['column', 'row'])
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
    return new Date(this.props.weatherData.time * 1000);
  }
  get flexDirectionClass () {
    let direction = this.props.flexDirection || 'column';
    return s[`weather--${direction}`];
  }

  render () {
    return (
      <article className={this.props.className + ' ' + s.weather + ' ' + this.flexDirectionClass}>
        {
          this.props.hourly?

          <h4 className={s.line}><DateDisplay date={this.timestamp} time={this.props.hourly} className={`date__date`}></DateDisplay></h4>:
          <h3 className={s.line}><DateDisplay date={this.timestamp} time={this.props.hourly} className={`date__time`}></DateDisplay></h3>
        }
        <div className={s.line + ' ' + s.row}>
          <WeatherIcon className={s.line} iconName={this.icon}></WeatherIcon>
          <div className={s.line + ' ' + s.column}>
            {
              this.currentTemp?
              <Temperature className={s.line} temp={this.currentTemp} className={s['temperature--single'] + ' temperature--single'}></Temperature>:
              ''
            }
            {
            (this.highTemp && this.lowTemp)?
              <div className={s.line}>
                <Temperature temp={this.highTemp} className="temperature--high"></Temperature>
                <span className="temperature__seperator">/</span>
                <Temperature temp={this.lowTemp} className="temperature--low"></Temperature>
              </div> :
              ''
            }
            <div className={s.line}>Precipitation: <Precipitation precipProbability={this.precip.percent} precipIntensity={this.precip.intensity} precipType={this.precip.type}></Precipitation></div>
          </div>
        </div>
      </article>
    )
  }
}

export default Weather;
