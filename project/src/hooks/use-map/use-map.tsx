import {useState, useEffect, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';

// import {Offer} from '../../types/offer';

type UseMapProps = {
  location: any
}

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: UseMapProps): void {

  // const {location} = city;

  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance) {
      return;
    }

    const { location: { latitude, longitude, zoom } } = city;

    const map = new Map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
    });

    map.addLayer(new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ));
    setMapInstance(map);
  }, [city, mapRef, mapInstance]);
}
export default useMap;
