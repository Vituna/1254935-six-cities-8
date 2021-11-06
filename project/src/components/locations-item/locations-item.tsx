import { Cities } from '../../const';

type LocationsItemProps = {
  currentCity: string,
  onCityChange: (city: string) => void,
}

function LocationsItem(props: LocationsItemProps): JSX.Element {
  const {currentCity, onCityChange} = props;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city, i) => (
              <li className="locations__item" key={`${city + i}`}>
                <a onClick={(evt) => { evt.preventDefault(); onCityChange(city); } } className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`} href="#!">
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default LocationsItem;
