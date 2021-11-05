import { ReviewPostStatus } from '../../const';
import { OfferReview } from '../../types/offer';
import { Stores } from '../../types/store';
import { StoreNameSpace } from '../root-reducer';

export const getReviews = (store: Stores): OfferReview[] =>
  store[StoreNameSpace.reviews].reviews;

export const getReviewPostStatus = (store: Stores): ReviewPostStatus =>
  store[StoreNameSpace.reviews].reviewPostStatus;
