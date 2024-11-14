import React, { useEffect } from "react";
import { Card, Button, Divider } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { formatDateTime } from "../../lib/utils";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();
  const { bookingStore } = useStore();
  const { getBooking, currentBooking, loadingInitial } = bookingStore;

  useEffect(() => {
    if (id) {
      getBooking(id); // Fetch booking details using the ID
    }
  }, [id, getBooking]);

  if (loadingInitial || !currentBooking) {
    return <p className="text-gray-600">Loading booking details...</p>;
  }

  const {
    customerName,
    phone,
    email,
    totalPrice,
    serviceName,
    address,
    bookingDate,
    latitude,
    longitude,
  } = currentBooking;

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div className="max-w-3xl mx-auto my-5 p-5 space-y-5">
      {/* User Information Section */}
      <Card className="p-5">
        <h3 className="text-xl font-bold mb-3">Customer Information</h3>
        <Divider />
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">Name:</p>
            <p className="text-gray-700">{customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p className="text-gray-700">{phone}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>
      </Card>

      {/* Booking Information Section */}
      <Card className="p-5">
        <h3 className="text-xl font-bold mb-3">Booking Information</h3>
        <Divider />
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">Service:</p>
            <p className="text-gray-700">{serviceName}</p>
          </div>
          <div>
            <p className="font-semibold">Total Price:</p>
            <p className="text-gray-700 border border-red-500 p-2 rounded-lg">
              {totalPrice} AED
            </p>
          </div>
          <div>
            <p className="font-semibold">Booking Date:</p>
            <p className="text-gray-700">
              {formatDateTime(bookingDate?.toString())}
            </p>
          </div>
          {address && (
            <div>
              <p className="font-semibold">Address:</p>
              <p className="text-gray-700">{address}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Map Section */}
      {latitude && longitude && (
        <Card className="p-5">
          <h3 className="text-xl font-bold mb-3">Location</h3>
          <Divider />
          <div className="h-72 mt-4">
            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>{address || "Booking Location"}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </Card>
      )}

      {/* Confirm Button */}
      <Button color="primary" className="mt-6 w-full">
        Confirm Booking
      </Button>
    </div>
  );
};

export default observer(BookingDetails);
