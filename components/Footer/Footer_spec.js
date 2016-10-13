import React from 'react';
import {shallow} from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  let footer;
  beforeAll(() => {
    footer = shallow(<Footer></Footer>);
  })
  it('says my name.', () => {

    const copyright = footer.find('.mdl-logo').text();

    expect(copyright.indexOf('Ashley Hill')).toBeGreaterThan(1);
  });

  it('has some icons', () => {
    const icons = footer.find('.mdl-mini-footer--social-btn');

    expect(icons.length).toBeGreaterThan(1);
  });
});
