import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/use-map/use-map';
import {Offers} from '../../types/offer';

import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

type MapProps = {
  offers: Offers[];
  mapSize: string;
  focusedCard?: Offers | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {

  const {offers, mapSize, focusedCard} = props;
  const city = offers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(
            focusedCard !== undefined && offer.title === focusedCard.title
              ? currentCustomIcon
              : defaultCustomIcon,
          ).addTo(map);
      });
    }
  }, [map, offers, focusedCard]);

  return (
    <div
      style={{ height: mapSize}}
      ref={mapRef}
    >
    </div>);
}

export default Map;
