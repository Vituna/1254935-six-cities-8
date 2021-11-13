import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import leaflet, { Map, LayerGroup, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Offer } from '../../types/offer';

import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  offers: Offer[];
  focusedCard?: Offer | null;
  zoomOnOffer?: boolean,
  scrolling?: boolean;
}

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 39],
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 39],
});

function MapCity(props: MapProps): JSX.Element {

  const {offers, focusedCard, zoomOnOffer = true, scrolling} = props;

  const mapRef = useRef(null);

  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  const pinsGroupRef = useRef<LayerGroup>(new leaflet.LayerGroup());

  const city = useMemo(() => offers[0].city, [offers]);

  const createMap = useCallback(() => {
    if (!mapRef.current || mapInstance) {
      return;
    }

    const { location: { latitude, longitude, zoom } } = city;

    const map = new Map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      scrollWheelZoom: !scrolling,
    });

    map.addLayer(new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ));
    setMapInstance(map);
  }, [mapInstance, city, scrolling]);

  const renderOffersPins = useCallback(() => {
    if (!mapInstance) {
      return;
    }

    const { location: { latitude, longitude, zoom } } = city;

    pinsGroupRef.current.clearLayers();

    mapInstance.flyTo([latitude, longitude], zoom);

    offers.forEach((offer) => {
      const pin = leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });

      const isActive = focusedCard && offer.id === focusedCard.id;

      pin.setIcon(isActive ? currentCustomIcon : defaultCustomIcon)
        .addTo(pinsGroupRef.current);

      isActive && zoomOnOffer && mapInstance.flyTo([offer.location.latitude, offer.location.longitude], offer.location.zoom);

      pinsGroupRef.current.addTo(mapInstance);
    });
  }, [zoomOnOffer, focusedCard, city, mapInstance, offers]);

  useEffect(createMap, [createMap]);

  useEffect(renderOffersPins, [renderOffersPins]);

  return (
    <div
      style={{ height: '100%'}}
      ref={mapRef}
    >
    </div>);
}

export default MapCity;
