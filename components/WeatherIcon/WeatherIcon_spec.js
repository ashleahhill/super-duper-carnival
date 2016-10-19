/* eslint-env node, jest */

import React from 'react';
import {shallow} from 'enzyme';
import WeatherIcon from './WeatherIcon';
import Skycons from 'react-skycons';

describe('WeatherIcon', () => {
  describe('when there is no icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon></WeatherIcon>).find(Skycons);
    });
    it('displays the default icon value', () => {
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_DAY');
    })
  });

  describe('when there is an unkown icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="frogs"></WeatherIcon>).find(Skycons);
    });
    it('displays the default icon value', () => {
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_DAY');
    })
  })
  describe('given an icon name', () => {
    let icon;
    beforeAll(() => {
      icon = shallow(<WeatherIcon iconName="clear-night"></WeatherIcon>).find(Skycons);
    });
    it('displays the icon value', () => {
      const out = icon.props('iconValue').icon;

      expect(out).toEqual('CLEAR_NIGHT');
    })
  })
});
