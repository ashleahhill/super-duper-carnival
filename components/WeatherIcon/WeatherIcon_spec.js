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
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_DAY');
    })
  });

  describe('when there is an unkown icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="frogs"></WeatherIcon>);
    });
    it('displays the default icon value', () => {
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_DAY');
    })
  })
  describe('given an icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="clear-night"></WeatherIcon>);
    });
    it('displays the icon value', () => {
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_NIGHT');
    })
  })
});
