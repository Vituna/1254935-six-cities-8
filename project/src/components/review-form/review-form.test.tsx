import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { sendReviewAction } from '../../store/api-actions';
import { fakeReview, storeAuth } from '../../utils/test-mocks';
import ReviewForm from './review-form';

const MAX_RATING_VALUE = 5;
const OFFER_ID = 1;

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);


describe('Component: ReviewForm', () => {

  it('should render correctly if storeAuth', () => {
    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <ReviewForm id={fakeReview.id} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('radio').length).toBe(MAX_RATING_VALUE);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('should dispatch postCommentAction when click submit', () => {
    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <ReviewForm id={fakeReview.id} />
        </Router>,
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Tell how/i), 'testText');
    expect(screen.getByDisplayValue(/testText/i)).toBeInTheDocument();

    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[MAX_RATING_VALUE - 1];
    userEvent.click(lastBtn);

    expect(mockStore(storeAuth).getActions()).toEqual([]);

    userEvent.click(screen.getByRole('button'));

    setTimeout(() => expect(mockStore(storeAuth).getActions()).toEqual([sendReviewAction(fakeReview, OFFER_ID)]), 0);
  });
});
