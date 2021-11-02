import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Ratings, ReviewPostStatus } from '../../const';
import { sendReviewAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { NewReview } from '../../types/offer';
import { Store } from '../../types/store';

type ReviewFormProps = {
  id: string,
}

const mapStateToProps = ({ reviewPostStatus }: Store) => ({
  isReviewPosting: reviewPostStatus === ReviewPostStatus.Posting,
  isReviewPosted: reviewPostStatus === ReviewPostStatus.Posted,
  isReviewNotPosted: reviewPostStatus === ReviewPostStatus.NotPosted,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  sendReviews(reviewData: NewReview, id: string) {
    dispatch(sendReviewAction(reviewData , id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewFormProps;

function ReviewForm(props: ConnectedComponentProps): JSX.Element {
  const { sendReviews, id , isReviewPosting, isReviewPosted, isReviewNotPosted } = props;

  const [comment, setСomment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    sendReviews({
      comment: comment,
      rating: Number(rating),
    }, id);
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setСomment(evt.target.value);

  };

  const handleChangeRating = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRating(evt.target.value);
  };

  useEffect(() => {
    if (isReviewPosted) {
      setRating('');
      setСomment('');
    }
  }, [isReviewPosted]);

  const isFormValid = comment.length > 60 && Boolean(rating);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitForm} >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">

        {Ratings.map(({ title, value }) => (
          <Fragment key={value}>
            <input className="form__rating-input visually-hidden" name="rating" checked={value === rating} value={value} id={`${value}-stars`} type="radio" onChange={handleChangeRating} disabled={isReviewPosting} />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title} >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} maxLength={300} onChange={handleChangeText} disabled={isReviewPosting}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid || isReviewPosting}>
          Submit
        </button>
      </div>

      {isReviewNotPosted && (
        <p style={{color: 'red', textAlign: 'center'}}>Sending error. Please, try again.</p>
      )}

    </form>
  );
}

export  {ReviewForm};
export default connector(ReviewForm);
