import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchCurrentHotelAction, fetchReviewsAction, fetchNearHotelAction, sendFavoriteAction } from '../../store/api-actions';
import { getCurrentHotel, getIsLoadCurrentHotelError, getNearHotels } from '../../store/offer-store/selectors';
import { getReviews } from '../../store/reviews-store/selectors';
import { getAuthorizationStatus } from '../../store/auth-store/selectors';
import { updateCurrentOffer, updateNearbyOffers } from '../../store/action';

import { Offer } from '../../types/offer';

import Header from '../header/header';
import OfferCard from '../offer-card/offer-card';
import ReviewList from '../review-list/review-list';
import Map from '../map/map';
import NoFound from '../no-found/no-found';

import { Page } from '../../const';
import { getRating, getСhangesType } from '../../utils';

function Property(): JSX.Element {

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string & number}>();

  const offer = useSelector(getCurrentHotel);
  const reviews = useSelector(getReviews);
  const nearHotels = useSelector(getNearHotels);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isLoadCurrentHotelError = useSelector(getIsLoadCurrentHotelError);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
    dispatch(fetchCurrentHotelAction(id));
    dispatch(fetchNearHotelAction(id));
  }, [dispatch, id]);

  const offers = useMemo(() => {
    if (!offer) {
      return [];
    }
    return [...nearHotels, offer];
  }, [offer, nearHotels]);

  const handleOfferFavoriteClick = () => {
    if (offer) {
      dispatch(sendFavoriteAction(
        offer,
        (updatedOffer) => {
          dispatch(updateCurrentOffer(updatedOffer));
        },
      ));
    }
  };

  const handleChangeFavorite = (currentOffer: Offer): void => {
    dispatch(sendFavoriteAction(currentOffer,
      (updatedOffer) => {
        dispatch(updateNearbyOffers(updatedOffer));
      },
    ));
  };

  return (
    <div className="page">

      <Header />

      {isLoadCurrentHotelError ? <NoFound/> : offer && (
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.slice(0, 6).map((image: string, i: number) => (
                  <div className="property__image-wrapper" key={`${image + i}`}>
                    <img className="property__image" src={image} alt="Studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button className={`property__bookmark-button button ${ offer.isFavorite ? 'property__bookmark-button--active' : ''}`} onClick={handleOfferFavoriteClick}  type="button" >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${getRating(offer.rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {getСhangesType(offer.type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((good: string, i: number) =>
                      (
                        <li className="property__inside-item" key={`${good + i}`}>
                          {good}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper
                      ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''}`}
                    >
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro && (
                      <span className="property__user-status">
                         Pro
                      </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <ReviewList review={reviews} authorizationStatus={authorizationStatus} id={id}/>
              </div>
            </div>
            <section className="property__map map">
              <Map offers={offers} focusedCard={offer} zoomOnOffer={false} scrolling/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearHotels.map((near) => (
                  <OfferCard offer={near} key={near.id} cardType={Page.Near} onFavoriteClick={handleChangeFavorite} />
                ))}
              </div>
            </section>
          </div>
        </main>)}
    </div>
  );
}

export {Property};

export default Property;
