import React from 'react';
import {shallow} from 'enzyme';
import WeatherIcon from './WeatherIcon';

describe('WeatherIcon', () => {
  describe('when there is no icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon></WeatherIcon>);
    });
    it('displays the default icon value', () => {
      const out = icon.find('span').text();

      expect(out).toEqual('defaultValue');
    })
  })
  describe('when there is an unkown icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="frogs"></WeatherIcon>);
    });
    it('displays the default icon value', () => {
      const out = icon.find('span').text();

      expect(out).toEqual('defaultValue');
    })
  })
  describe('given an icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="clear-day"></WeatherIcon>);
    });
    it('displays the icon value', () => {
      const out = icon.find('span').text();

      expect(out).toEqual('sun');
    })
  })
});
