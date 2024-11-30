import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapViewUpdaterProps = {
  lat: number | undefined;
  lng: number | undefined;
};

const MapViewUpdater = ({ lat, lng }: MapViewUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], map.getZoom(), {
        animate: true,
        duration: 0.5, // Smooth transition
      });
    }
  }, [lat, lng, map]);

  return null;
};

export default MapViewUpdater;
