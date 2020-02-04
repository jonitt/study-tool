import { shallow } from 'enzyme';
import React from 'react';
import App from '../../containers/app/App';

//mock fetch
const mockSuccessResponse = {},
  mockJsonPromise = Promise.resolve(mockSuccessResponse),
  mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('App', () => {
  it('renders correctly', () => {
    shallow(<App />);
  });
});
