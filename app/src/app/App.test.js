import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import Sinon from 'sinon';

import App from './App';

describe('<App />', () => {


  var mockSubmit = Sinon.spy();
  var mockError = Sinon.spy();

  it('renders a single <p>', () => {
    const wrapper = mount(<App onSubmit={mockSubmit} onError={mockError}/>);
    wrapper.find('button').simulate('submit');
    expect(mockError.calledOnce).to.equal(true);

    wrapper.setState({
      textualValue: "Im a real value"
    });
    //click doesnt work in this context have to use the submit event
    wrapper.find('button').simulate('submit');
    expect(mockSubmit.calledOnce).to.equal(true);

  });
});