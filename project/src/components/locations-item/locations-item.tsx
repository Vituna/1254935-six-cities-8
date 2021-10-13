type LocationsItemProps = {
  cities: string[];
}

function LocationsItem(props: LocationsItemProps): JSX.Element {
  const { cities } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, i) => (
            <li className="locations__item" key={`${city + i}`}>
              <a className="locations__item-link tabs__item" href="#!">
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
