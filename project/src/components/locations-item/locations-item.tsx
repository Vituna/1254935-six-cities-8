type LocationsItemProps = {
  cities: string[];
  currentCity: string,
  onCityChange: (city: string) => void,
}

function LocationsItem(props: LocationsItemProps): JSX.Element {
  const {cities, currentCity, onCityChange} = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, i) => (
            <li className="locations__item" key={`${city + i}`}>
              <a onClick={(evt) => {evt.preventDefault(); onCityChange(city);}} className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`} href="#!">
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LocationsItem;
