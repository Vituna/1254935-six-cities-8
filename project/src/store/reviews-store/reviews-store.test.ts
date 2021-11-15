import { fakeReviews} from '../../utils/test-mocks';
import { ReviewPostStatus } from '../../const';
import { reviewsReducer } from './reviews-store';
import { loadReviews, sendReviewStatus } from '../action';

const reviews = fakeReviews;

describe('Reducer: reviews', () => {
  const state = {
    reviews: [],
    reviewPostStatus: ReviewPostStatus.Pristine,
  };

  it('should update to reviews', () => {

    expect(reviewsReducer(state, loadReviews(reviews)))
      .toEqual( {
        reviews: reviews,
        reviewPostStatus: ReviewPostStatus.Pristine,
      },
      );
  });

  it('should update to SendReviewStatus', () => {

    expect(reviewsReducer(state, sendReviewStatus(ReviewPostStatus.Posting)))
      .toEqual( {
        reviews: [],
        reviewPostStatus: ReviewPostStatus.Posting,
      },
      );
  });

});
