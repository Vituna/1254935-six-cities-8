import Header from '../header/header';
import Logo from '../logo/logo';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

import {page} from '../../const';

type FavoritesProps = {
  offers: Offer[];
  authorizationStatus: string;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
}

function Favorites(props: FavoritesProps): JSX.Element {
  const {offers, authorizationStatus, onListItemHover, onListItemLeave} = props;

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

      {(favoriteOffers.length === 0) ? (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer) => (
                      <OfferCard {...offer} key={offer.id}  cardType={page.Favorites} onListItemHover={onListItemHover}  onListItemLeave={onListItemLeave}/>
                    ))}
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">

        <Logo />

      </footer>
    </div>
  );
}

export default Favorites;
