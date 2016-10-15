/* eslint-env node, jest */

import React from 'react';
import { shallow } from 'enzyme';
import { getText } from './../../test/util';

import ForecastDay from './ForecastDay';

describe('ForecastDay', () => {

    let suite = {};
    beforeAll(() => {
      let testInfo = [
        {
          timestamp: 1
        },
        {
          timestamp: 2
        },
        {
          timestamp: 3
        },
        {
          timestamp: 4
        }
      ]
      suite.out = shallow(<ForecastDay forecasts={testInfo}></ForecastDay>);
    });

    it('should show up', () => {
      expect(suite.out).toBeDefined();
    })
});
