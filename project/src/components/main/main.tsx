import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {Store} from '../../types/store';
import {Actions} from '../../types/action';
import {changeCurrentCity} from '../../store/action';

import Header from '../header/header';
import LocationsItem from '../locations-item/locations-item';
import Sort from '../sort/sort';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';

import {MapSize} from '../../const';
import {Offer} from '../../types/offer';

type MainScreenProps = {
  cities: string[];
  placesSort: string[];
  authorizationStatus: string;
  onListItemHover: (listItemName: string) => void;
  onListItemLeave: () => void;
  focusedCard?: Offer | undefined;
}

const mapStateToProps = ({ currentCity, offers }: Store) => (
  { currentCity, offers }
);

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange: (city: string) => {
    dispatch(changeCurrentCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux & MainScreenProps): JSX.Element {

  const {offers, cities, placesSort, authorizationStatus, focusedCard, onListItemHover, onListItemLeave, currentCity, onCityChange} = props;

  const cityOffers = offers.filter((offer) => currentCity === offer.city.name);
  const noOffers = cityOffers.length === 0;

  return(
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus}/>

      <main className={`page__main page__main--index' ${noOffers ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>

        <LocationsItem cities={cities} currentCity={currentCity} onCityChange={onCityChange}/>

        {noOffers ? (<MainEmpty currentCity={currentCity} />) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {currentCity}</b>

                <Sort placesSort={placesSort}/>

                <CardsList offers={cityOffers} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">

                  <Map offers={cityOffers} mapSize={MapSize.MapHeightOffer} focusedCard={focusedCard}/>

                </section>
              </div>
            </div>
          </div>)}

      </main>
    </div>
  );
}

export {Main};

export default connector(Main);
