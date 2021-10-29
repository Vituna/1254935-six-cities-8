import {useParams} from 'react-router-dom';
import {useEffect, useMemo} from 'react';

import Header from '../header/header';
import OfferCard from '../offer-card/offer-card';
import ReviewList from '../review-list/review-list';
import Map from '../map/map';

import {page, MapSize} from '../../const';
import { ThunkAppDispatch } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../../types/store';
import { fetchCurrentHotelAction, fetchReviewsAction, fetchNearHotelAction } from '../../store/api-actions';

type PropertyProps = {
  authorizationStatus: string;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
}

const mapStateToProps = ({ currentHotel, reviews, nearHotel }: Store) => (
  { currentHotel, reviews, nearHotel}
);

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchReviews: (id: string) => {
    dispatch(fetchReviewsAction(id));
  },
  fetchCurrentHotel: (id: string) => {
    dispatch(fetchCurrentHotelAction(id));
  },
  fetchNearbyHotel: (id: string) => {
    dispatch(fetchNearHotelAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Property(props: PropsFromRedux & PropertyProps): JSX.Element {
  const {currentHotel: offer, reviews, authorizationStatus, nearHotel, onListItemHover, onListItemLeave, fetchReviews, fetchCurrentHotel, fetchNearbyHotel} = props;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchReviews(id);
    fetchCurrentHotel(id);
    fetchNearbyHotel(id);
  }, [fetchCurrentHotel, fetchReviews, fetchNearbyHotel, id]);

  const offers = useMemo(() => {
    if (!offer) {
      return [];
    }
    return [...nearHotel, offer];
  }, [offer, nearHotel]);

  // const [isActiveFavorite, setActiveFavorite] = useState(offer.isFavorite);
  // const handleSort = (): void => {
  //   setActiveFavorite(!isActiveFavorite);
  // };
  // console.log(authorizationStatus)

  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

      {offer && (
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.slice(0, 6).map((image: string, i: number) => (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt="Studio"/>
                  </div>
                ))};
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
                  <button className={`property__bookmark-button button ${offer.isFavorite ? 'property__bookmark-button--active' : ''}`} type="button" >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${offer.rating / 5 * 100}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms}
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
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    <span className="property__user-status">
                      {offer.host.isPro ? 'Pro' : ''}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <ReviewList review={reviews} authorizationStatus={authorizationStatus}/>

              </div>
            </div>
            {}
            <section className="property__map map">

              <Map offers={offers} mapSize={MapSize.MapHeightOffer} focusedCard={offer} zoomOnOffer={false}/>

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearHotel.map((near) => (
                  <OfferCard {...near} key={near.id} cardType={page.Near} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
                ))}
              </div>
            </section>
          </div>
        </main>)}
    </div>
  );
}

export {Property};

export default connector(Property);
