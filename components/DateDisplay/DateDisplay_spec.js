import React from 'react';
import {shallow} from 'enzyme';
import DateDisplay from './DateDisplay';

describe('DateDisplay', () => {
  let dateDisplay;
  let timeDisplay;
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  beforeAll(() => {
    let date = new Date();
    dateDisplay = shallow(<DateDisplay date={date}></DateDisplay>);
    timeDisplay = shallow(<DateDisplay date={date} time={true}></DateDisplay>);
  })

  describe('when in date mode', () => {
    it('shows date', () => {
      const dayPattern = new RegExp(`^${days.join('|')}`);

      const out = dateDisplay.text();
      expect(dayPattern.test(out)).toBe(true);
    });

  });
  describe('when in time mode', () => {
    it('shows time', () => {
      const timePattern = /[0-9]+:[0-6][0-9]/;

      const out = timeDisplay.text();
      expect(timePattern.test(out)).toBe(true);
    });
  });
});
