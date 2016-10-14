import React from 'react';
import { shallow } from 'enzyme';
import { getText } from './../../test/util';
import { weatherForDay, weatherForCurrent, weatherForHour } from './fixtures';

import Weather from './Weather';

describe('Weather', () => {
  describe('when showing current weather', () => {
    let suite = {};
    beforeAll(() => {
      suite.out = shallow(<Weather weatherData={weatherForCurrent}></Weather>);
    });
    testIcon.bind(suite)();
    testTemperature.bind(suite)();
    testTempHighLow.bind(suite)(true);
    testPrecipitation.bind(suite)();
    testDate.bind(suite)();
  });
  describe('when showing a day\'s weather', () => {
    let suite = {};
    beforeAll(() => {
      suite.out = shallow(<Weather weatherData={weatherForDay}></Weather>);
    });
    testIcon.bind(suite)()
    testTemperature.bind(suite)(true);
    testTempHighLow.bind(suite)();
    testPrecipitation.bind(suite)();
    testDate.bind(suite)();
  });
  describe('when showing an hour\'s weather', () => {
    let suite = {};
    beforeAll(() => {
      suite.out = shallow(<Weather weatherData={weatherForHour} hourly={true}></Weather>);
    });
    testIcon.bind(suite)();
    testTemperature.bind(suite)();
    testTempHighLow.bind(suite)(true);
    testPrecipitation.bind(suite)();
    testTime.bind(suite)();
  });
});


function testIcon () {
  it('should display icon', () => {
    expect(this.out.find('WeatherIcon').length).toEqual(1);
  });
}

function testTempHighLow(testFalse) {
  it(`should  ${testFalse? 'not': ''} display temperature high and low`, () => {
    if (testFalse) {
      expect(this.out.find('Temperature').filter('.temperature--high').length).not.toEqual(1);
      expect(this.out.find('Temperature').filter('.temperature--low').length).not.toEqual(1);
    } else {
      expect(this.out.find('Temperature').filter('.temperature--high').length).toEqual(1);
      expect(this.out.find('Temperature').filter('.temperature--low').length).toEqual(1);
    }
  });
}

function testTemperature(testFalse) {
  it(`should  ${testFalse? 'not': ''}  display temperature`, () => {
    if (testFalse) {

      expect(this.out.find('Temperature').filter('.temperature--single').length).not.toEqual(1);
    } else {

      expect(this.out.find('Temperature').filter('.temperature--single').length).toEqual(1);
    }
  });
}

function testPrecipitation () {
  it('should display precipitation', () => {
    expect(this.out.find('Precipitation').length).toEqual(1);
  });
}

function testDate () {
  it('should display date', () => {
     expect(this.out.find('DateDisplay').filter('.date__date').length).toEqual(1);
  });
}

function testTime () {
  it('should display time', () => {
     expect(this.out.find('DateDisplay').filter('.date__time').length).toEqual(1);
  });
}
