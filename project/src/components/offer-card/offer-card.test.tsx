import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeOffer, storeAuth } from '../../utils/test-mocks';

import OfferCard from './offer-card';
import { Page } from '../../const';

describe('Component: OfferCard', () => {

  it('should render with text "bookmarks" ant text "night" in OfferCard', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <OfferCard offer={fakeOffer} cardType={Page.Offer} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

});
