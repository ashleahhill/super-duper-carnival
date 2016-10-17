/* eslint-env node, jest */

import React from 'react';
import {shallow} from 'enzyme';
import Temperature from './Temperature';

describe('Temperature', () => {
  let temperaturePattern = /^([0-9\.]+)/

  describe('when degrees are Farenheit', () => {
    let degrees;
    let out;
    let symbolEl;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={48.71} precision={2}></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
      symbolEl = degrees.find('sup');
    });

    it('display degrees', ()=>{

      expect(out[1]).toEqual('48.71');
    });
    it('display degree type', () => {

      expect(symbolEl).toEqual('°F');
    });
  });

  describe('when degrees are Celcius', () => {
    let degrees;
    let out;
    let symbolEl;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={68} degrees="C"></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
      symbolEl = degrees.find('sup');
    });
    it('display degrees', ()=>{
      expect(out[1]).toBeDefined();
    });
    it('display degree type', () => {
      expect(symbolEl).toEqual('°C');
    });
    it('converts degrees', () => {
      expect(out[1]).toEqual('20');
    })
  });

  describe('when degrees are Celcius and not evenly divided', () => {
    let degrees;
    let out;
    let symbolEl;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={459.67} degrees="C" precision={2}></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
      symbolEl = degrees.find('sup');
    });
    it('converts and rounds', () => {
      expect(out[1]).toEqual('237.59');
    })
  })
});
