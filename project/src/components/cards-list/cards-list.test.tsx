import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeOffers, storeAuth } from '../../utils/test-mocks';
import { City } from '../../types/offer';
import CardsList from './cards-list';

const mockStore = configureMockStore();

const history = createMemoryHistory();
const onSortChange = jest.fn();

describe('Component: CardsList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <CardsList currentCity={City.Paris} offers={fakeOffers} noOffers={false} onSortChange={onSortChange} />
        </Router>,
      </Provider>,
    );

    const cardOfferElements: HTMLElement[] = screen.getAllByText(/night/i);

    expect(cardOfferElements.length).toBe(fakeOffers.length);
  });

  it('should render correctly, when NoOffers', () => {
    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <CardsList currentCity={City.Paris} offers={[]} noOffers onSortChange={onSortChange}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
