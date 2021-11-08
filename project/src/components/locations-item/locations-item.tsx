import { Cities } from '../../const';

type LocationsItemProps = {
  currentCity: string,
  onCityChange: (city: string) => void,
}

function LocationsItem(props: LocationsItemProps): JSX.Element {
  const {currentCity, onCityChange} = props;

  const handleCityChange = (evt: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, city: string) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city, i) => (
              <li className="locations__item" key={`${city + i}`}>
                <a onClick={
                  (evt) => handleCityChange(evt, city)
                }
                className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`} href="#!"
                >
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
