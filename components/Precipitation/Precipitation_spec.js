/* eslint-env node, jest */

import React from 'react';
import {shallow} from 'enzyme';
import {getText} from './../../test/util';
import Precipitation from './Precipitation';

const precipPattern = /([0-9]+%) chance of ([\w]+)/;

describe('Precipitation', () => {
  describe('when there is no precipitation', () => {

    testNoPrecip(0);
    testNoPrecip(.1, 0);
    testNoPrecip(.1, 1);
  });

  describe('when there is a chance of precipitation', () => {

    testPrecip(.1, 'snow');
    testPrecip(1, 'rain');
    testPrecip(.05, 'sleet');
  });

});


function testNoPrecip(percent, intensity, type) {
  it('displays "none"', () => {
      let test = getText(shallow(<Precipitation precipProbability={percent} precipIntensity={intensity} precipType={type}></Precipitation>));
      let out = /^none$/.test(test);

      expect(out).toBe(true);
  });
}
function testPrecip(percent, precip) {
    it (`displays that there is ${percent}% chance of ${precip}`, () => {
      let test = getText(shallow(<Precipitation precipProbability={percent} precipIntensity={1} precipType={precip}></Precipitation>));
      let out = test.match(precipPattern);

      expect(out[1]).toEqual(`${+((percent * 100).toFixed(2))}%`);
      expect(out[2]).toEqual(`${precip}`);
    });
}
