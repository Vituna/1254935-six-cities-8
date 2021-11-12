import { Link } from 'react-router-dom';

import { Offer } from '../../types/offer';

import { page } from '../../const';
import { getRating } from '../../utils';

type OfferCardProps = {
  cardType: string;
  offer: Offer;
  onListItemHover?: ((offer: Offer) => void)
  onListItemLeave?: (() => void)
  onFavoriteClick?: (offer: Offer) => void,
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {cardType, offer, onListItemHover, onListItemLeave, onFavoriteClick} = props;
  const {id, type, title, price, rating, isFavorite, isPremium, previewImage} = offer;

  const isFavoriteCardType: boolean = cardType === page.Favorites;

  const getСhangesClassName = (): string => {
    switch (cardType) {
      case page.Offer:
        return 'cities__place-card';
      case page.Favorites:
        return 'favorites__card';
      case page.Near:
        return 'near-places__card';
      default:
        return '';
    }
  };

  const handleScrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteClick = () => {
    onFavoriteClick && onFavoriteClick(offer);
  };

  const handleHoverCard = () => {
    onListItemHover && onListItemHover(offer);
  };

  const handleLeaveCard = () => {
    onListItemLeave && onListItemLeave();
  };

  return (
    <article className={`place-card ${getСhangesClassName()}`} onMouseEnter={handleHoverCard} onMouseLeave={handleLeaveCard}>
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
          <button className={!isFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button button place-card__bookmark-button--active'} type="button" onClick={handleFavoriteClick} >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" ></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(rating)}%`}}></span>
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
