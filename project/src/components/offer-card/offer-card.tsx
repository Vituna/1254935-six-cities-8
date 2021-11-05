import {Link} from 'react-router-dom';
import {MouseEvent, useState} from 'react';

import {Offer} from '../../types/offer';

import {page} from '../../const';
import { sendFavoriteAction } from '../../store/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteHotelItems } from '../../store/favorite-store/selectors';

interface OfferCardProps {
  cardType: string;
  offer: Offer;
  onListItemHover: ((listItemName: string) => void)
  onListItemLeave: (() => void)
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {cardType, offer, onListItemHover, onListItemLeave} = props;
  const {id, type, title, price, rating, isPremium, previewImage} = offer;

  const dispatch = useDispatch();
  const isFavoriteStatus = useSelector(getFavoriteHotelItems);

  const isFavorites = !isFavoriteStatus.find((films) => films.id === id);


  const handleScrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isActiveFavorite, setActiveFavorite] = useState(isFavorites);

  const handleChangeFavorite = (): void => {
    dispatch(sendFavoriteAction(offer));
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
          <button className={isActiveFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button button place-card__bookmark-button--active'} type="button" onClick={handleChangeFavorite} >
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
          <Link to={`/offer/${id}`} onClick={handleScrollTop}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
