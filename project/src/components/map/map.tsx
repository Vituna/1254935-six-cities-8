import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/use-map/use-map';
import {Offers} from '../../types/offer';

import {URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  offers: Offers[]
}

function Map(props: MapProps): JSX.Element {

  const {offers} = props;
  const city = offers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [defaultCustomIcon, map, offers]);

  return (
    <div
      style={{ height: '850px' }}
      ref={mapRef}
    >
    </div>);
}

export default Map;
