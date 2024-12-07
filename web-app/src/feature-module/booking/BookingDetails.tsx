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
import LoadingSpinner from "../common/LoadingSpinner";

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
    return <LoadingSpinner />
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
    bookingCode,
  } = currentBooking;

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <>
      <div className="listing-page">
        <Breadcrumbs title="Booking Details" subtitle="Bookings" />

        <div className="container my-3">
          <div className="sortby-sec">
            <div className="sorting-div">
              <div className="row d-flex align-items-center">
                <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                  <div className="count-search">
                    <BackToButton
                      label="Back to booking list"
                      href={all_routes.bookingDashboard}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                  <div className="product-filter-group"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Grid View */}

      <div className="container mb-5 ">
        <Card className="p-6 shadow-md border border-gray-200">
          {/* Customer Information Section */}
          <div className="flex items-center gap-5 justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800  mb-2">
              Customer Information
            </h3>
            {totalPrice && (
              <div className="flex items-center gap-2 px-4 py-2 border rounded">
                <p className="text-red-600 text-xl">{totalPrice} AED</p>
              </div>
            )}
          </div>
          <Divider />
          <div className="mt-4 grid grid-cols-2 gap-6">
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

          {/* Booking Information Section */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2 mt-6">
            Booking Information
          </h3>
          <Divider />
          <div className="mt-4 grid grid-cols-2 gap-6">
            {carName && (
              <div>
                <p className="font-medium text-gray-700">Car Name:</p>
                <p className="text-gray-600">{carName}</p>
              </div>
            )}

            {bookingStatus && (
              <div className="flex flex-col items-start gap-2">

                <StatusBadge status={bookingStatus.toString()} />

                {userStore.isAdmin() && (
                  <>
                    {bookingStatus ===
                      convertEnumToString(
                        BookingStatus.InProcess,
                        BookingStatus
                      ) && (
                        <div className="flex items-center gap-2">
                          <Link
                            to={""}
                            onClick={() => setStatusCompleted(id ?? "")}
                            className="text-blue-600 underline"
                          >
                            Set as completed
                          </Link>{" "}
                          |
                          <Link
                            to={""}
                            onClick={() => setStatusPending(id ?? "")}
                            className="text-blue-600 underline"
                          >
                            Set as Pending
                          </Link>
                        </div>
                      )}

                    {bookingStatus ===
                      convertEnumToString(
                        BookingStatus.Canceled,
                        BookingStatus
                      ) && (
                        <Link
                          to={""}
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
                        <div className="flex items-center gap-2">
                          <Link
                            to={""}
                            onClick={() => setStatusCanceled(id ?? "")}
                            className="text-blue-600 underline"
                          >
                            Set as Canceled
                          </Link>{" "}
                          |
                          <Link
                            to={""}
                            onClick={() => setStatusInProcess(id ?? "")}
                            className="text-blue-600 underline"
                          >
                            Set as In-Progress
                          </Link>
                        </div>
                      )}
                  </>
                )}
              </div>
            )}
            {bookingCode && <div>
              <p className="font-medium text-gray-700">Booking Code:</p>
              <p className="text-gray-600">
                {bookingCode}
              </p>
            </div>}
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
                <p className="font-medium text-gray-700">End Booking Date:</p>
                <p className="text-gray-600">
                  {formatDateTime(endBookingDate?.toString())}
                </p>
              </div>
            )}
            {createdBy && (
              <div>
                <p className="font-medium text-gray-700">Created By:</p>
                <p className="text-gray-600">{createdBy}</p>
              </div>
            )}
            {updatedBy && (
              <div>
                <p className="font-medium text-gray-700">Updated By:</p>
                <p className="text-gray-600">{updatedBy}</p>
              </div>
            )}
            {createDate && (
              <div>
                <p className="font-medium text-gray-700">Create Date:</p>
                <p className="text-gray-600">{formatDateTime(createDate)}</p>
              </div>
            )}
            {updateDate && (
              <div>
                <p className="font-medium text-gray-700">Update Date:</p>
                <p className="text-gray-600">{formatDateTime(updateDate)}</p>
              </div>
            )}

            {serviceName && (
              <div>
                <p className="font-medium text-gray-700">Service:</p>
                <p className="text-gray-600">{serviceName}</p>
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
                <p className="font-medium text-gray-700">Service Option Fee:</p>
                <p className="text-gray-600">{serviceOptionFee} AED</p>
              </div>
            )}
          </div>

          {/* Map Section */}
          {latitude && longitude && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">
                Location
              </h3>
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
    </>
  );
};

export default observer(BookingDetails);
