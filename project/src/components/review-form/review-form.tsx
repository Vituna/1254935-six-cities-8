import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendReviewAction } from '../../store/api-actions';
import { getReviewPostStatus } from '../../store/reviews-store/selectors';

import { Ratings, ReviewPostStatus } from '../../const';
import { getFormValid } from '../../utils';

type ReviewFormProps = {
  id: number,
}

function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { id  } = props;

  const dispatch = useDispatch();

  const reviewPostStatus = useSelector(getReviewPostStatus);

  const [
    isReviewPosting,
    isReviewPosted,
    isReviewNotPosted,
  ] = [
    reviewPostStatus === ReviewPostStatus.Posting,
    reviewPostStatus === ReviewPostStatus.Posted,
    reviewPostStatus === ReviewPostStatus.NotPosted,
  ];

  useEffect(() => {
    if (isReviewPosted) {
      setRating('');
      setСomment('');
    }
  }, [isReviewPosted]);

  const [comment, setСomment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendReviewAction({comment, rating: Number(rating)}, id));
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setСomment(evt.target.value);
  };

  const handleChangeRating = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRating(evt.target.value);
  };

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
        <button className="reviews__submit form__submit button" type="submit" disabled={!getFormValid(comment.length, rating) || isReviewPosting}>
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
export default ReviewForm;
