import React from 'react';
import UserForm from '../UserForm';
import { shallow } from 'enzyme';

it('executes onSubmit callback', () => {
  const cb = jest.fn();
  const component = shallow(<UserForm onSubmit={cb} />);
  const form = component.find('form');
  form.simulate('submit', { preventDefault: () => {} });
  expect(cb).toBeCalled();
})