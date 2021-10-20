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

  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

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
      <footer className="footer container">

        <Logo />

      </footer>
    </div>
  );
}

export default Favorites;
