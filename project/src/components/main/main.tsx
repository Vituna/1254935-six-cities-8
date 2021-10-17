import Header from '../header/header';
import LocationsItem from '../locations-item/locations-item';
import Sort from '../sort/sort';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';

import {Offers} from '../../types/offer';

type MainScreenProps = {
  offers: Offers[];
  cities: string[];
  PlacesSort: string[];
  authorizationStatus: string;
}

function Main(props: MainScreenProps): JSX.Element {

  const {offers, cities, PlacesSort: placesOtion, authorizationStatus} = props;

  return(
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <LocationsItem cities={cities}/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>

              <Sort PlacesSort={placesOtion}/>

              <CardsList offers={offers} />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <Map offers={offers}/>

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
