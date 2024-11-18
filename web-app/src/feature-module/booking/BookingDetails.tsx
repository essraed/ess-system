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
    <div className="max-w-3xl mx-auto m-3 space-y-6">
      {/* User Information Section */}
      <Card className="p-6 shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Information</h3>
        <Divider />
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-medium text-gray-700">Name:</p>
            <p className="text-gray-600">{customerName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Phone:</p>
            <p className="text-gray-600">{phone}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Email:</p>
            <p className="text-gray-600">{email}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Address:</p>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Booking Information</h3>
        <Divider />
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-medium text-gray-700">Service:</p>
            <p className="text-gray-600">{serviceName}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-gray-700 text-lg">Total Price:</p>
            <div className="flex items-center gap-2 mt-2 bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg shadow-inner">
              <span className="text-red-600 font-semibold text-xl">
                {totalPrice} AED
              </span>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-700">Booking Date:</p>
            <p className="text-gray-600">
              {formatDateTime(bookingDate?.toString())}
            </p>
          </div>
        </div>

        {/* Map Section */}
        {latitude && longitude && (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Location</h3>
            <Divider />
            <div className="h-72 mt-4 rounded-lg overflow-hidden border border-gray-300">
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
          </>
        )}

        {/* Confirm Button */}
        <Button color="primary" className="mt-8 w-full" size="lg">
          Confirm Booking
        </Button>
      </Card>
    </div>
  );
};

export default observer(BookingDetails);
