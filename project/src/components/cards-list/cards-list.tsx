import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';
import MainEmpty from '../main-empty/main-empty';

import {MapSize, page} from '../../const';
import Sort from '../sort/sort';
import Map from '../map/map';
import { useSelector } from 'react-redux';
import { getTypeSort } from '../../store/menu-store/selectors';

type CardsProps = {
  offers: Offer[];
  currentCity: string;
  noOffers: boolean;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
  onSortChange: (option: string) => void,
  focusedCard?: Offer | undefined;
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers, currentCity, focusedCard, noOffers, onListItemHover, onListItemLeave, onSortChange} = props;

  const typeSort = useSelector(getTypeSort);

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
                  (<OfferCard key={offer.id} offer={offer} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave} cardType={page.Offer} />),
                )}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <Map offers={offers} mapSize={MapSize.MapHeightOffer} focusedCard={focusedCard} />

              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardsList;
