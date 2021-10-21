import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

import {page} from '../../const';

type CardsProps = {
  offers: Offer[]
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers, onListItemHover, onListItemLeave} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (<OfferCard key={offer.id} {...offer} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave} cardType={page.Offer} />),
      )}
    </div>
  );
}

export default CardsList;
