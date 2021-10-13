import React from 'react';

import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offer';

import {page} from '../../const';

type CardsProps = {
  offers: Offers[]
}

function CardsList(props: CardsProps): JSX.Element {
  const {offers} = props;

  // const [focusedCard, setFocusedCard] = React.useState({});

  const handleHoverCard = (obj: Offers): void => {
    // setFocusedCard(obj);
  };


  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (<OfferCard key={offer.id} {...offer} handleHoverCard={() => handleHoverCard(offer)} cardType={page.Offer} />),
      )}
    </div>
  );
}

export default CardsList;
