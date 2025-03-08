import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import {
  CanceledReason,
  convertEnumToString,
  formatDateTime,
} from "../../lib/utils";
import { useParams } from "react-router-dom";
import { BookingStatus } from "../../types/booking";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import StatusBadge from "../common/StatusBadge";
import Header from "../common/header";
import Footer from "../common/footer";
import BookingCheckout from "./BookingCheckout";
import { IMAGE_SERVER_PATH } from "../../environment";
import ClientForm from "../clients/ClientForm";
import ClientsTable from "../clients/ClientsTable";

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

  const [canceledReason, setCanceledReason] = useState<string>("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [flag, setFlag] = useState<boolean>(false);
  const [addClientFlag, setaddClientFlag] = useState<boolean>(false);

  const handleCancelWithReason = () => {
    const reason: CanceledReason = { reason: canceledReason };
    if (canceledReason.trim()) {
      setStatusCanceled(id ?? "", reason);
    } else {
      alert("Please provide a reason for the cancellation.");
    }
  };

  useEffect(() => {
    if (id) {
      getBooking(id); // Fetch booking details using the ID
    }
    if (flag) setFlag(false);
    if (addClientFlag) setaddClientFlag(false);
  }, [id, getBooking, flag, addClientFlag]);

  if (loadingInitial || !currentBooking) {
    return <p className="text-gray-600">Loading booking details...</p>;
  }

  const {
    clients,
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
    paymentStatus,
    createDate,
    paymentType,
    updateDate,
    updatedBy,
    fileEntities,
    adultsNumber,
    childrenNumber,
    duration,
    processTime,
    nationalityName,
    reason,
    entryType,
  } = currentBooking;

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <>
      <Header />

      {userStore.isLoggedIn ? (
        <div className="booking-details-page w-full ">
          <div className="custom-container mx-auto py-6 px-4">
            <div className="border bg-custom-light-blue p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Booking Details
                </h1>
                {userStore.isAdmin() && (
                  <BackToButton
                    label="Back to Bookings"
                    href={all_routes.bookingDashboard}
                  />
                )}
              </div>

              {/* Booking Summary */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Customer Info */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Customer Information
                  </h2>
                  <Divider />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {customerName && (
                      <div>
                        <p className="font-medium">Name:</p>
                        <p>{customerName}</p>
                      </div>
                    )}
                    {phone && (
                      <div>
                        <p className="font-medium">Phone:</p>
                        <p>{phone}</p>
                      </div>
                    )}
                    {email && (
                      <div>
                        <p className="font-medium">Email:</p>
                        <p>{email}</p>
                      </div>
                    )}
                    {adultsNumber && (
                      <div>
                        <p className="font-medium">Adults Number:</p>
                        <p>{adultsNumber}</p>
                      </div>
                    )}
                    {childrenNumber || (childrenNumber === 0 && processTime) ? (
                      <div>
                        <p className="font-medium">Children Number:</p>
                        <p>{childrenNumber ?? "0"}</p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                    {duration && (
                      <div>
                        <p className="font-medium">Duration:</p>
                        <p>{duration}</p>
                      </div>
                    )}
                    {processTime && (
                      <div>
                        <p className="font-medium">Process Time:</p>
                        <p>{processTime}</p>
                      </div>
                    )}
                    {entryType && (
                      <div>
                        <p className="font-medium">Entry Type:</p>
                        <p>{entryType}</p>
                      </div>
                    )}
                    {nationalityName && (
                      <div>
                        <p className="font-medium">Nationality Name:</p>
                        <p>{nationalityName}</p>
                      </div>
                    )}
                  </div>

                  <Divider className="mt-2" />
                  {adultsNumber && clients!.length == 0 && (
                    <div className="w-full mt-3">
                      <ClientForm
                        key={`${adultsNumber}-${childrenNumber}`} // Use quantity as part of the key to force re-render
                        quantity={(adultsNumber ?? 0) + (childrenNumber ?? 0)} // Use nullish coalescing to default null/undefined to 0
                        id={id}
                        setaddClientFlag={setaddClientFlag}
                      />
                    </div>
                  )}
                </div>

                {/* Booking Info */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Booking Information
                  </h2>
                  <Divider />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {serviceName && (
                      <div>
                        <p className="font-medium text-gray-800">Service:</p>
                        <p>{serviceName}</p>
                      </div>
                    )}
                    {carName && (
                      <div>
                        <p className="font-medium text-gray-800">Car Name:</p>
                        <p>{carName}</p>
                      </div>
                    )}
                    {bookingCode && (
                      <div>
                        <p className="font-medium text-gray-800">
                          Booking Code:
                        </p>
                        <p>{bookingCode}</p>
                      </div>
                    )}

                    {/* Payment Status */}
                    <div>
                      <p className="font-medium">Payment Status:</p>
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                          paymentStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </div>

                    {/* Payment Type */}
                    <div>
                      <p className="font-medium">Payment Type:</p>
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                          paymentType
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {paymentType || "Still Not Paid"}
                      </span>
                    </div>

                    {bookingDate && (
                      <div>
                        <p className="font-medium ">Booking Date:</p>
                        <p>{formatDateTime(bookingDate.toString())}</p>
                      </div>
                    )}

                    {serviceOptionName && (
                      <div>
                        <p className="font-medium text-gray-800">
                          Service Option:
                        </p>
                        <p>{serviceOptionName}</p>
                      </div>
                    )}
                    {serviceOptionFee && (
                      <div>
                        <p className="font-medium text-gray-800">
                          Service Option Fee:
                        </p>
                        <p>{serviceOptionFee} AED</p>
                      </div>
                    )}

                    {/* Booking Status */}
                    {bookingStatus && (
                      <div className="md:col-span-2">
                        <p className="font-medium text-gray-800">Status:</p>
                        <div className="flex justify-between items-center space-x-2 mt-2">
                          <StatusBadge status={bookingStatus.toString()} />
                        </div>

                        {/* Admin Controls for Status Management */}
                        {userStore.isAdmin() && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {bookingStatus ===
                              convertEnumToString(
                                BookingStatus.InProcess,
                                BookingStatus
                              ) && (
                              <>
                                <button
                                  onClick={() => setStatusCompleted(id ?? "")}
                                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
                                >
                                  Completed
                                </button>
                                <button
                                  onClick={() => setStatusPending(id ?? "")}
                                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
                                >
                                  Pending
                                </button>
                              </>
                            )}
                            {bookingStatus ===
                              convertEnumToString(
                                BookingStatus.Canceled,
                                BookingStatus
                              ) && (
                              <button
                                onClick={() => setStatusInProcess(id ?? "")}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
                              >
                                In-Progress
                              </button>
                            )}
                            {bookingStatus ===
                              convertEnumToString(
                                BookingStatus.Pending,
                                BookingStatus
                              ) && (
                              <>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => setShowReasonInput(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
                                  >
                                    Canceled
                                  </button>

                                  {/* Step 2: Show input field when cancellation reason is empty */}
                                  {showReasonInput && (
                                    <div className="pt-2">
                                      <textarea
                                        value={canceledReason}
                                        onChange={(e) =>
                                          setCanceledReason(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        placeholder="Please provide a reason for cancellation..."
                                      />
                                      <div className="mt-2">
                                        <button
                                          onClick={handleCancelWithReason}
                                          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
                                        >
                                          Submit Reason and Cancel
                                        </button>
                                        <button
                                          onClick={() =>
                                            setShowReasonInput(false)
                                          } // Optionally hide the input without canceling
                                          className="ml-2 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg shadow hover:bg-gray-600"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  <button
                                    onClick={() => setStatusInProcess(id ?? "")}
                                    className="px-4 py-2 mt-2 text-sm font-medium text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
                                  >
                                    In-Progress
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {totalPrice && (
                      <div>
                        <p className="font-medium">Total Price:</p>
                        <p>{totalPrice} AED</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {userStore.isAdmin && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                      Update Information
                    </h2>
                    <Divider />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {bookingDate && (
                        <div>
                          <p className="font-medium">Booking Date:</p>
                          <p>{formatDateTime(bookingDate.toString())}</p>
                        </div>
                      )}
                      {createDate && (
                        <div>
                          <p className="font-medium">Create Date:</p>
                          <p>{formatDateTime(createDate?.toString())}</p>
                        </div>
                      )}
                      {updateDate && userStore.isAdmin() && (
                        <div>
                          <p className="font-medium">Last Updated:</p>
                          <p>{formatDateTime(updateDate)}</p>
                        </div>
                      )}
                      {updatedBy && userStore.isAdmin() && (
                        <div>
                          <p className="font-medium">Updated By:</p>
                          <p>{updatedBy}</p>
                        </div>
                      )}
                      {reason && (
                        <div>
                          <p className="font-medium">Reason Of Cancelling:</p>
                          <p>{reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Uploaded Files */}
              {fileEntities && fileEntities.length > 0 && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Uploaded Files
                  </h2>

                  <Divider />

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-1">
                    {fileEntities.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-col items-center justify-between p-1 bg-white border rounded-lg shadow-md"
                      >
                        <a
                          target="blank"
                          href={`${IMAGE_SERVER_PATH}/${file.filePath}`}
                          download={file.fileName}
                        >
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer mb-3">
                            {/* Thumbnail or File Icon */}

                            {file?.fileName?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                              <img
                                src={`${IMAGE_SERVER_PATH}/${file.filePath}`}
                                alt={file.fileName}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-gray-600 text-3xl">📄</span> // Default icon for non-image files
                            )}
                          </div>
                        </a>

                        {/* File Name */}

                        <p className="text-gray-800 truncate text-center">
                          {file.fileName}
                        </p>

                        {/* Download Link */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {clients!.length! > 0 && (
                <>
                  <Divider />
                  <div className="mt-2">
                    <ClientsTable clients={clients} setFlag={setFlag} email={email} status={bookingStatus!}/>{" "}
                    {/* Passing clients as prop */}
                  </div>
                </>
              )}

              {/* Location Info */}
              {latitude && longitude && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Booking Location
                  </h2>
                  <div className="h-72 rounded-lg overflow-hidden border">
                    <MapContainer
                      center={[latitude, longitude]}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker
                        position={[latitude, longitude]}
                        icon={customIcon}
                      >
                        <Popup>{address || "Booking Location"}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <BookingCheckout />
      )}

      <Footer />
    </>
  );
};

export default observer(BookingDetails);
