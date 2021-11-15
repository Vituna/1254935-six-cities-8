import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth } from '../../utils/test-mocks';
import { City } from '../../types/offer';
import LocationsItem from './locations-item';

const ACTIVE_CLASS = 'tabs__item tabs__item--active';

const onCityChange = jest.fn();

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: locations-item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <LocationsItem currentCity={City.Paris} onCityChange={onCityChange} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Paris/i).parentElement).toHaveClass(ACTIVE_CLASS);
    expect(screen.queryAllByRole('link').length).toBe(Object.values(City).length);
  });
});
