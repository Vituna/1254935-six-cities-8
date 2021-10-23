import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

import {page} from '../../const';

type CardsProps = {
  offers: Offer[];
  typeSort: string;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers, typeSort, onListItemHover, onListItemLeave} = props;

  const sortLowHigh = [...offers].sort((a, b): number => a.price - b.price);
  const sortHighLow = [...offers].sort((a, b): number => b.price - a.price);
  const sortTop = [...offers].sort((a, b): number => b.rating - a.rating);

  const getSortOffers = (): Offer[] => {
    // if (typeSort === 'Popular') {
    //   return ([...offers]);
    // }
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
    <div className="cities__places-list places__list tabs__content">
      {getSortOffers().map((offer: Offer) =>
        (<OfferCard key={offer.id} {...offer} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave} cardType={page.Offer} />),
      )}
    </div>
  );
}

export default CardsList;
