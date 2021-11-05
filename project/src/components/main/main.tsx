import { useSelector, useDispatch } from 'react-redux';
import {changeCurrentCity, changePlacesSort} from '../../store/action';

import Header from '../header/header';
import LocationsItem from '../locations-item/locations-item';
import CardsList from '../cards-list/cards-list';
import Preloader from '../loading-screen/loading-screen';

import {Offer} from '../../types/offer';
import { getCurrentCity } from '../../store/menu-store/selectors';
import { getHotels, getIsOffersLoading } from '../../store/offer-store/selectors';

type MainScreenProps = {
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
  focusedCard?: Offer | undefined;
}

function Main(props: MainScreenProps): JSX.Element {
  const {focusedCard,  onListItemHover, onListItemLeave} = props;

  const currentCity = useSelector(getCurrentCity);
  const offers = useSelector(getHotels);
  const isOffersLoading = useSelector(getIsOffersLoading);

  const dispatch = useDispatch();
  const onCityChange = (city: string) => {
    dispatch(changeCurrentCity(city));
  };

  const onSortChange = (option: string) => {
    dispatch(changePlacesSort(option));
  };

  const cityOffers = offers.filter((offer) => currentCity === offer.city.name);
  const noOffers = cityOffers.length === 0;

  return(
    <div className="page page--gray page--main">

      <Header />

      <main className={`'page__main ' ${noOffers ? 'page__main--index-empty' : 'page__main--index'}`}>

        <LocationsItem currentCity={currentCity} onCityChange={onCityChange} />

        {isOffersLoading ? (<Preloader />) : (
          <CardsList offers={cityOffers} currentCity={currentCity} focusedCard={focusedCard} noOffers={noOffers} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave} onSortChange={onSortChange} />
        )}

      </main>
    </div>
  );
}

export {Main};

export default Main;
