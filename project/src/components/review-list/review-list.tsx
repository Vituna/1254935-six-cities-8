import {OfferReview} from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  review: OfferReview[];
}

function ReviewList(props: ReviewListProps): JSX.Element {
  const {review} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{review.length}</span>
      </h2>
      <ul className="reviews__list">
        {review.map((comment) => <ReviewItem {...comment} key={comment.id} />)}
      </ul>
      <ReviewForm />
    </section>
  );
}

export default ReviewList;
