import React, { useEffect, useState } from "react";
import { Card, Button, Divider } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { convertEnumToString, formatDateTime } from "../../lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookingStatus } from "../../types/booking";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import Breadcrumbs from "../common/breadcrumbs";
import StatusBadge from "../common/StatusBadge";
import Header from "../common/header";
import Footer from "../common/footer";
import { log } from "console";
import toast from "react-hot-toast";

const BookingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bookingStore, userStore, paymentStore } = useStore();
  const {
    getBooking,
    currentBooking,
    loadingInitial,
    setStatusCompleted,
    setStatusCanceled,
    setStatusInProcess,
    setStatusPending,
  } = bookingStore;

  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");

  const onConfirmClick = () => {
    if (!paymentType) {
      setError("You must choose a payment method to complete your booking."); // Show error
      return;
    }
    setError(""); // Clear error if payment method is valid
    handleConfirmBooking(); // Proceed with the confirmation logic
  };

  const handleConfirmBooking = async () => {
    if (paymentType === "Direct") {
      setStatusInProcess(id ?? "");
    } else if (paymentType === "Online") {
      const formData = new FormData();

      formData.append(
        "TransactionAmount",
        currentBooking?.totalPrice ? currentBooking.totalPrice.toString() : ""
      );
      formData.append("CustomerName", currentBooking?.customerName ?? "");
      formData.append("CustomerEmail", currentBooking?.email ?? "");
      formData.append("CustomerPhone", currentBooking?.phone ?? "");
      formData.append("OrderName", currentBooking?.serviceName ?? "");
      formData.append("OrderId", currentBooking!.id);

      try {
        const result = await paymentStore.initiatePayment(formData);

        if (result?.status === "success") {
          console.log("PaymentURl", result.data);
          window.location.href = result.data as string;
        } else {
          toast.error("Payment initiation failed!");
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
        toast.error("An error occurred while initiating payment.");
      }
    }
  };
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
    bookingCode,
    serviceOptionName,
    serviceOptionFee,
    bookingStatus,
    bookingDate,
    endBookingDate,
    paymentStatus,
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
                {userStore.isAdmin() && (
                  <div className=" bg-white  rounded-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Payment Status
                    </h4>
                    {bookingStatus ===
                    convertEnumToString(
                      BookingStatus.InProcess,
                      BookingStatus
                    ) ? (
                      paymentStatus ? (
                        <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                          {paymentStatus}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
                          Direct Payment
                        </span>
                      )
                    ) : (
                      <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                        Still No Payment
                      </span>
                    )}
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
                {bookingCode && (
                  <div>
                    <p className="font-medium text-gray-700">Booking Code:</p>
                    <p className="text-gray-600">{bookingCode} AED</p>
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

            {/* Payment Selection */}
            {!userStore.isAdmin() &&
              bookingStatus ===
                convertEnumToString(BookingStatus.Pending, BookingStatus) && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Payment Method
                  </h2>
                  <Divider className="mb-2" />
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentType"
                        value="Direct"
                        checked={paymentType === "Direct"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700 text-lg">
                        Direct Payment
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentType"
                        value="Online"
                        checked={paymentType === "Online"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700 text-lg">
                        Online Payment
                      </span>
                    </label>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p> // Show error message
                  )}
                </div>
              )}
            {/* Confirm Button */}
            {!userStore.isAdmin() &&
              bookingStatus ===
                convertEnumToString(BookingStatus.Pending, BookingStatus) && (
                <div className="mt-6">
                  <Button
                    color="primary"
                    className="w-full"
                    size="lg"
                    onClick={onConfirmClick}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default observer(BookingDetails);
