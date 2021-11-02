import {OfferReview} from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';
import {AuthorizationStatus} from '../../const';

type ReviewListProps = {
  review: OfferReview[];
  authorizationStatus: string;
  id: string;
}

function ReviewList(props: ReviewListProps): JSX.Element {
  const {review, authorizationStatus, id} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{review.length}</span>
      </h2>
      <ul className="reviews__list">
        {review.map((comment) => <ReviewItem {...comment} key={comment.id} />)}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth &&
        <ReviewForm id={id} />}
    </section>
  );
}

export default ReviewList;
