import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteHotelItems } from '../../store/favorite-store/selectors';
import { loadFavoriteAction, sendFavoriteAction } from '../../store/api-actions';
import { changeCurrentCity, updateFavoriteOffers } from '../../store/action';

import { Offer } from '../../types/offer';

import Header from '../header/header';
import Logo from '../logo/logo';
import OfferCard from '../offer-card/offer-card';

import { APIRoute, Page } from '../../const';

type GrouppedOffers = Record<string, Offer[]>

function Favorites(): JSX.Element {

  const dispatch = useDispatch();

  const favoriteHotelItems = useSelector(getFavoriteHotelItems);

  const favoriteOffers = favoriteHotelItems.filter((offer) => offer.isFavorite);

  const groupedFavoriteOffers = favoriteOffers.reduce<GrouppedOffers>((res, offer) => {
    const { name } = offer.city;
    if (!Object.keys(res).includes(name)) {
      res[name] = [];
    }
    res[name].push(offer);
    return res;
  }, {});

  const handleFavoriteClick = (currentOffer: Offer) => {
    dispatch(sendFavoriteAction(currentOffer,
      (updatedOffer) => {
        dispatch(updateFavoriteOffers(updatedOffer));
      },
    ));
  };

  const handleCityLinkClick = (city: string) => {
    dispatch(changeCurrentCity(city));
  };

  useEffect(() => {
    dispatch(loadFavoriteAction());
  }, [dispatch]);

  return (
    <div className="page">

      <Header />

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
                {Object.entries(groupedFavoriteOffers).map(([cityName, cityOffers]) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" onClick={() => handleCityLinkClick(cityName)} to={APIRoute.Main}>
                          <span>{cityName}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer: Offer) => (
                        <OfferCard offer={offer} key={offer.id} cardType={Page.Favorites} onFavoriteClick={handleFavoriteClick} />
                      ))}
                    </div>
                  </li>
                ))}
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
