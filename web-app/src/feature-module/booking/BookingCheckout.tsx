import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

const BookingCheckout = () => {
  const navigate = useNavigate();
  const { bookingStore, paymentStore } = useStore();
  const { getBooking, loadingInitial, isSession, setStatusInProcess } =
    bookingStore;

  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);

  const onConfirmClick = () => {
    if (!paymentType) {
      setError("You must choose a payment method to complete your booking."); // Show error
      return;
    }
    setError("");
    handleConfirmBooking();
  };
  const handleConfirmBooking = async () => {
    if (paymentType === "Direct") {
      bookings.map((b) => setStatusInProcess(b.id ?? ""));
    } else if (paymentType === "Online") {
      const formData = new FormData();

      const totalAmount = bookings.reduce(
        (sum, x) => sum + (Number(x.totalPrice) || 0),
        0
      );
      formData.append("TransactionAmount", totalAmount.toString());

      formData.append("CustomerName", bookings[0].customerName ?? "");
      formData.append("CustomerEmail", bookings[0].email ?? "");
      formData.append("CustomerPhone", bookings[0].phone ?? "");
      const serviceNames = bookings.map((x) => x.serviceName).join(", ");
      const bookingIds = bookings.map((x) => x.id).join(", ");

      formData.append("OrderName", serviceNames || "");
      formData.append("OrderId", bookings[0].id || "");

      try {
        const result = await paymentStore.initiatePayment(formData);

        if (result?.status === "success") {
          window.location.href = result.data as string;
        } else {
          console.log("payment error",result.error);
          console.log("payment Result",result);
          toast.error("Payment initiation failed!");
        }
      } catch (error) {
        toast.error("An error occurred while initiating payment.");
      }
    }
  };

  useEffect(() => {
    const fetchAllBookings = async () => {
      if (isSession && isSession.length > 0) {
        try {
          const bookingPromises = isSession.map((id) => getBooking(id));

          const fetchedBookings = await Promise.all(bookingPromises);
          const validBookings = fetchedBookings.filter(
            (booking) => booking !== null
          );

          setBookings(validBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };
    fetchAllBookings();
  }, [isSession, getBooking]);

  if (loadingInitial || bookings.length === 0) {
    return <LoadingSpinner />;
  }

  const totalPrice = Array.isArray(bookings)
    ? bookings.reduce((sum, x) => sum + (Number(x?.totalPrice) || 0), 0)
    : 0;

  return (
    <>
      <div className="custom-container mx-auto px-4 py-8  min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Customer Information */}
          <div className="lg:col-span-7">
            <div className="bg-white  p-6 border border-gray-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Customer Information
              </h3>
              <div className="space-y-3">
                <p>
                  <strong>Name:</strong> {bookings[0]?.customerName}
                </p>
                <p>
                  <strong>Phone:</strong> {bookings[0]?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {bookings[0]?.email}
                </p>
                <p>
                  <strong>Address:</strong> {bookings[0]?.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Services Summary */}
          <div className="lg:col-span-5 border border-gray-300">
            <div className="bg-white  p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Services Summary
              </h3>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Service Name</th>
                    <th className="p-2 text-right">Price (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{booking.serviceName}</td>
                      <td className="p-2 text-right">
                        {booking.totalPrice} AED
                      </td>
                    </tr>
                  ))}
                  {/* Dotted Divider */}
                  <tr>
                    <td colSpan={2} className="py-2">
                      <div className="border-t-2 border-dotted border-gray-300"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Total Price:</td>
                    <td className="p-2 text-lg text-blue-600 text-right">
                      {totalPrice} AED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5"></div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 bg-white  p-6 mt-6 border border-gray-300">
            <h3 className="text-left lg:text-right text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Payment Method
            </h3>
            <div className="flex flex-col items-start lg:items-end space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="Direct"
                  checked={paymentType === "Direct"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="mr-2"
                />
                Direct Payment
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="Online"
                  checked={paymentType === "Online"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="mr-2"
                />
                Online Payment
              </label>
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/services")}
            className="w-1/2 lg:w-1/6 bg-gray-300 text-gray-800  py-2 font-semibold hover:bg-gray-400"
          >
            Add More
          </button>
          <button
            onClick={onConfirmClick}
            className="w-1/2 lg:w-1/6 bg-blue-600 text-white  py-2 font-semibold hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(BookingCheckout);
