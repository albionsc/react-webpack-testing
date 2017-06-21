import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('renders a single <p>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('span')).to.have.length(1);
  });
});