import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getTypeSort } from '../../store/menu-store/selectors';
import { sendFavoriteAction } from '../../store/api-actions';

import { Offer } from '../../types/offer';

import OfferCard from '../offer-card/offer-card';
import Sort from '../sort/sort';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';

import { page } from '../../const';

type CardsProps = {
  offers: Offer[];
  currentCity: string;
  noOffers: boolean;
  onSortChange: (option: string) => void,
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers, currentCity, noOffers, onSortChange} = props;

  const dispatch = useDispatch();

  const typeSort = useSelector(getTypeSort);

  const [focusedCard, setFocusedCard] = useState<Offer | null>(null);

  const sortLowHigh = [...offers].sort((a, b): number => a.price - b.price);
  const sortHighLow = [...offers].sort((a, b): number => b.price - a.price);
  const sortTop = [...offers].sort((a, b): number => b.rating - a.rating);

  const getSortOffers = (): Offer[] => {
    if (typeSort === 'Price: low to high') {
      return (sortLowHigh);
    }
    if (typeSort === 'Price: high to low') {
      return (sortHighLow);
    }
    if (typeSort === 'Top rated first') {
      return (sortTop);
    }
    return [...offers];
  };

  const onListItemHover = (offer: Offer) => {
    setFocusedCard(offer);
  };

  const onListItemLeave = () => {
    setFocusedCard(null);
  };

  const handleChangeFavorite = (offer: Offer): void => {
    dispatch(sendFavoriteAction(offer));
  };

  return (
    <div className="cities">
      <div className={`cities__places-container container ${noOffers ? 'cities__places-container--empty' : ''}`}>
        {noOffers ? (
          <MainEmpty currentCity={currentCity} />
        ) : (
          <>
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity}</b>

              <Sort typeSort={typeSort} onSortChange={onSortChange} />
              <div className="cities__places-list places__list tabs__content">

                {getSortOffers().map((offer: Offer) =>
                  (<OfferCard key={offer.id} offer={offer} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave} onFavoriteClick={handleChangeFavorite} cardType={page.Offer} />),
                )}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <Map offers={getSortOffers()} focusedCard={focusedCard} />

              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardsList;

