import React, { useEffect } from "react";
import { Card, Button, Divider } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { Link, useParams } from "react-router-dom";
import { BookingStatus } from "../../types/booking";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import Breadcrumbs from "../common/breadcrumbs";
import StatusBadge from "../common/StatusBadge";
import Header from "../common/header";
import Footer from "../common/footer";

const BookingDetails = () => {
  const { id } = useParams();
  const { bookingStore, userStore } = useStore();
  const {
    getBooking,
    currentBooking,
    loadingInitial,
    setStatusCompleted,
    setStatusCanceled,
    setStatusInProcess,
    setStatusPending,
  } = bookingStore;

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
    address,
    latitude,
    longitude,
    totalPrice,
    serviceName,
    carName,
    createdBy,
    updatedBy,
    createDate,
    updateDate,
    serviceOptionName,
    serviceOptionFee,
    bookingStatus,
    bookingDate,
    endBookingDate,
  } = currentBooking;

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <>
      <Header />
      <div className="booking-details-page">
        {/* Header */}
        {userStore.isAdmin() && (
          <div className="bg-gray-50 py-2 px-4 shadow-sm border-b">
            <Breadcrumbs title="Booking Details" subtitle="Bookings" />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto py-4 px-3 sm:px-4">
          <Card className="shadow-md border rounded-lg p-4 bg-white">
            {/* Back Button for Admin */}
            {userStore.isAdmin() && (
              <div className="mb-3">
                <BackToButton
                  label="Back to Booking List"
                  href={all_routes.bookingDashboard}
                />
              </div>
            )}

            {/* Customer Information */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Customer Information
                </h2>
                {totalPrice && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                    {totalPrice} AED
                  </span>
                )}
              </div>
              <Divider className="mb-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customerName && (
                  <div>
                    <p className="font-medium text-gray-700">Name:</p>
                    <p className="text-gray-600">{customerName}</p>
                  </div>
                )}
                {phone && (
                  <div>
                    <p className="font-medium text-gray-700">Phone:</p>
                    <p className="text-gray-600">{phone}</p>
                  </div>
                )}
                {email && (
                  <div>
                    <p className="font-medium text-gray-700">Email:</p>
                    <p className="text-gray-600">{email}</p>
                  </div>
                )}
                {address && (
                  <div>
                    <p className="font-medium text-gray-700">Address:</p>
                    <p className="text-gray-600">{address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Information */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Booking Information
              </h2>
              <Divider className="mb-2" />
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {serviceName && (
                  <div>
                    <p className="font-medium text-gray-700">Service:</p>
                    <p className="text-gray-600">{serviceName}</p>
                  </div>
                )}
                {carName && (
                  <div>
                    <p className="font-medium text-gray-700">Car Name:</p>
                    <p className="text-gray-600">{carName}</p>
                  </div>
                )}
                {bookingStatus && (
                  <div>
                    <p className="font-medium text-gray-700">Status:</p>
                    <StatusBadge status={bookingStatus.toString()} />
                    {userStore.isAdmin() && (
                      <div className="mt-2 space-x-2">
                        {bookingStatus ===
                          convertEnumToString(
                            BookingStatus.InProcess,
                            BookingStatus
                          ) && (
                          <>
                            <Link
                              to=""
                              onClick={() => setStatusCompleted(id ?? "")}
                              className="text-blue-600 underline"
                            >
                              Set as Completed
                            </Link>
                            |
                            <Link
                              to=""
                              onClick={() => setStatusPending(id ?? "")}
                              className="text-blue-600 underline"
                            >
                              Set as Pending
                            </Link>
                          </>
                        )}
                        {bookingStatus ===
                          convertEnumToString(
                            BookingStatus.Canceled,
                            BookingStatus
                          ) && (
                          <Link
                            to=""
                            onClick={() => setStatusInProcess(id ?? "")}
                            className="text-blue-600 underline"
                          >
                            Set as In-Progress
                          </Link>
                        )}
                        {bookingStatus ===
                          convertEnumToString(
                            BookingStatus.Pending,
                            BookingStatus
                          ) && (
                          <>
                            <Link
                              to=""
                              onClick={() => setStatusCanceled(id ?? "")}
                              className="text-blue-600 underline"
                            >
                              Set as Canceled
                            </Link>
                            |
                            <Link
                              to=""
                              onClick={() => setStatusInProcess(id ?? "")}
                              className="text-blue-600 underline"
                            >
                              Set as In-Progress
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {bookingDate && (
                  <div>
                    <p className="font-medium text-gray-700">Booking Date:</p>
                    <p className="text-gray-600">
                      {formatDateTime(bookingDate?.toString())}
                    </p>
                  </div>
                )}
                {endBookingDate && (
                  <div>
                    <p className="font-medium text-gray-700">End Date:</p>
                    <p className="text-gray-600">
                      {formatDateTime(endBookingDate?.toString())}
                    </p>
                  </div>
                )}

                {serviceOptionName && (
                  <div>
                    <p className="font-medium text-gray-700">Service Option:</p>
                    <p className="text-gray-600">{serviceOptionName}</p>
                  </div>
                )}
                {serviceOptionFee && (
                  <div>
                    <p className="font-medium text-gray-700">Service Fee:</p>
                    <p className="text-gray-600">{serviceOptionFee} AED</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            {latitude && longitude && userStore.isAdmin() && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Location
                </h2>
                <Divider className="mb-2" />
                <div className="h-72 rounded-md overflow-hidden border border-gray-300">
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
              </div>
            )}

            {/* Confirm Button */}
            <div className="mt-6">
              <Button color="primary" className="w-full" size="lg">
                Confirm Booking
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default observer(BookingDetails);
