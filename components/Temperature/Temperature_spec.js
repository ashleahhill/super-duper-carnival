import React from 'react';
import {shallow} from 'enzyme';
import Temperature from './Temperature';

describe('Temperature', () => {
  let temperaturePattern = /^([0-9\.]+) (°C|°F)/

  describe('when degrees are Farenheit', () => {
    let degrees;
    let out;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={48.71}></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
    });
    it('display degrees', ()=>{

      expect(out[1]).toEqual('48.71');
    });
    it('display degree type', () => {

      expect(out[2]).toEqual('°F');
    });
  });

  describe('when degrees are Celcius', () => {
    let degrees;
    let out;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={68} degrees="C"></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
    });
    it('display degrees', ()=>{
      expect(out[1]).toBeDefined();
    });
    it('display degree type', () => {
      expect(out[2]).toEqual('°C');
    });
    it('converts degrees', () => {
      expect(out[1]).toEqual('20');
    })
  });

  describe('when degrees are Celcius and not evenly divided', () => {
    let degrees;
    let out;
    beforeAll(() => {
      degrees = shallow(<Temperature temp={459.67} degrees="C"></Temperature>);
      out = degrees.find('span').text().match(temperaturePattern);
    });
    it('converts and rounds', () => {
        expect(out[1]).toEqual('237.59');
    })
  })
});
