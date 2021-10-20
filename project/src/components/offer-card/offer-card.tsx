import {Link} from 'react-router-dom';
import {useState, MouseEvent} from 'react';

import {OfferCardType} from '../../types/offer';

import {page} from '../../const';

interface OfferCardProps extends OfferCardType {
  cardType: string;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {id, type, title, price, rating, isPremium, isFavorite, previewImage, cardType, onListItemHover, onListItemLeave} = props;

  const [isActiveFavorite, setActiveFavorite] = useState(isFavorite);

  const handleSort = (): void => {
    setActiveFavorite(!isActiveFavorite);
  };

  const handleHoverCard = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover(title);
  };

  const handleLeaveCard = () => {
    onListItemLeave();
  };

  const isOffercardType: boolean = cardType === page.Offer;
  const isFavoriteCardType: boolean = cardType === page.Favorites;
  const isNearCardType: boolean = cardType === page.Near;

  return (
    <article className={`place-card ${isFavoriteCardType && 'favorites__card'} ${isOffercardType && 'cities__place-card'} ${isNearCardType && 'near-places__card'}`} onMouseEnter={handleHoverCard} onMouseLeave={handleLeaveCard}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={isFavoriteCardType ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={!isActiveFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button button place-card__bookmark-button--active'} type="button" onClick={handleSort} >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" ></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
