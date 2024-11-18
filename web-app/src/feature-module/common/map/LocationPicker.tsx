// LocationPicker.tsx
import { useMapEvents } from "react-leaflet";

const LocationPicker = ({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(event: any) {
      const { lat, lng } = event.latlng;
      onLocationChange(lat, lng);
    },
  });

  return null;
};

export default LocationPicker;
