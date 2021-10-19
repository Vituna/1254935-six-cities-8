import {useParams} from 'react-router-dom';
import {useState} from 'react';

import Header from '../header/header';
import OfferCard from '../offer-card/offer-card';
import ReviewList from '../review-list/review-list';
import {mockReviews} from '../../mocks/reviews';
import Map from '../map/map';

import {page, MapSize} from '../../const';
import {Offers} from '../../types/offer';


type PropertyProps = {
  authorizationStatus: string;
  offers: Offers[];
  focusedCard?: Offers | undefined;
  onListItemHover: (listItemName: string) => void;
}

type UseParamTypes = {
  id: string;
}

function Property(props: PropertyProps): JSX.Element {
  const {offers, authorizationStatus, focusedCard, onListItemHover} = props;
  const params = useParams<UseParamTypes>();
  const item = offers[+params.id - 1];
  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = item;

  const [isActivFavorite, setActivFavorite] = useState(isFavorite);

  const handleSort = (): void => {
    setActivFavorite(!isActivFavorite);
  };

  const offersMap = offers.slice(0, 3);

  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((img, i) =>
                (
                  <div className="property__image-wrapper" key={`${img + i}`}>
                    <img className="property__image" src={img} alt="Photos studio" />
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button ${isActivFavorite ? 'property__bookmark-button--active' : ''}`} type="button" onClick={handleSort} >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating / 5 * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) =>
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
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                      Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>

              <ReviewList review={mockReviews} />

            </div>
          </div>
          <section className="property__map map">

            <Map offers={offers} mapSize={MapSize.MapHeighthOffer} focusedCard={focusedCard}/>

          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersMap.map((offer) => (
                <OfferCard {...offer} key={offer.id} cardType={page.Near} onListItemHover={onListItemHover}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
