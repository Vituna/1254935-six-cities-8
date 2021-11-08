import { Actions, ActionType } from '../../types/action';
import { ReviewsStore } from '../../types/store';

import { ReviewPostStatus } from '../../const';

const initialState: ReviewsStore = {
  reviews: [],
  reviewPostStatus: ReviewPostStatus.Pristine,
};

export const reviewsReducer = (state = initialState, action: Actions): ReviewsStore => {
  switch (action.type) {
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.SendReviewStatus:
      return {
        ...state,
        reviewPostStatus: action.payload,
      };

    default:
      return state;
  }
};
