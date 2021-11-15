import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeReviews, storeAuth } from '../../utils/test-mocks';
import { OfferReview } from '../../types/offer';
import ReviewList from './review-list';
import { AuthorizationStatus } from '../../const';

const REVIEW_TEXT_SELECTOR = '.reviews__text';
const MAX_COMMENTS_NUMBER = 10;
const id = 3;

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const makeListLowerCase = (arr: string[]) => arr.map((item) => item.toLowerCase());

const getCommentsFromElements = (arr: HTMLElement[]) => makeListLowerCase(arr.map((element) => {
  const reviewText = element.querySelector(REVIEW_TEXT_SELECTOR)?.textContent;
  return reviewText ? reviewText : '';
}));

const getCommentsFromData = (arr: OfferReview[]) => makeListLowerCase(arr.map((item) => item.comment));

describe('Component: ReviewList', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <ReviewList review={fakeReviews} authorizationStatus={AuthorizationStatus.Auth} id={id}/>
        </Router>,
      </Provider>,
    );

    const liElements = screen.queryAllByRole('listitem');
    const dataComments = storeAuth.REVIEWS.reviews.slice(0, MAX_COMMENTS_NUMBER);
    expect(liElements.length).toBe(dataComments.length);
    expect(getCommentsFromElements(liElements)).toEqual(getCommentsFromData(dataComments));
  });
});
