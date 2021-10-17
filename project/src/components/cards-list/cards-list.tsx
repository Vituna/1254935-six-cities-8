import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offer';

import {page} from '../../const';

type CardsProps = {
  offers: Offers[]
  onListItemHover: (listItemName: string) => void;
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers, onListItemHover} = props;


  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (<OfferCard key={offer.id} {...offer} onListItemHover={onListItemHover} cardType={page.Offer} />),
      )}
    </div>
  );
}

export default CardsList;
