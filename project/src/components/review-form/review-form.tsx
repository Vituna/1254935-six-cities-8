import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import { sendReviewAction } from '../../store/api-actions';
// import { ThunkAppDispatch } from '../../types/action';

// const mapStateToProps = ({ authorizationStatus }: Store) => (
//   { authorizationStatus }
// );

// const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
//   sendReviews(id: number, reviewData: any) {
//     dispatch(sendReviewAction(id, reviewData));
//   },
// });

const connector = connect(null, null);

type PropsFromRedux = ConnectedProps<typeof connector>;


function ReviewForm(sendReviews: PropsFromRedux): JSX.Element {
  const [reviewValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitForm = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  };

  const handleChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    // setReviewValue(evt.target.value);
    // sendReviews(id, {
    //   rating: formRef.current.rating.value,
    //   comment: reviewRef.current.value,
    // });
  };

  const handleChangeRating = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRating(+evt.target.value);
  };

  const isFormValid = reviewValue.length > 60 && Boolean(rating);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">

        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleChangeRating} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleChangeRating} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleChangeRating} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleChangeRating} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleChangeRating} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={reviewValue} onChange={handleChangeText} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export  {ReviewForm};
export default connector(ReviewForm);
