import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
import { formatDateTime, paymentType } from "../../lib/utils";
import GooglePayButton from "@google-pay/button-react";

const BookingCheckout = () => {
  const navigate = useNavigate();
  const { bookingStore, paymentStore } = useStore();
  const { getBooking, loadingInitial, isSession } = bookingStore;

  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [flag, setFlag] = useState<boolean>(false);
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
    const type: paymentType = { type: paymentType };

    if (paymentType === "Direct") {
      try {
        // Set payment type for all bookings
        await Promise.all(
          bookings.map((b) =>
            bookingStore.setPaymentTypeOfBooking(b.id ?? "", type)
          )
        );
        setFlag(true);
        toast.success("Booking payment type set to Direct");
      } catch (err) {
        setError("Failed to set payment type.");
        toast.error("Error updating payment type.");
      }
    } else if (paymentType === "Online") {
      setIsLoading(true);
      const formData = new FormData();

      const totalAmount = bookings.reduce(
        (sum, x) => sum + (Number(x.totalPrice) || 0),
        0
      );
      let finalAmount = totalAmount + totalAmount * 0.03; // Add 3%

      // ✅ If you need to round to 2 decimals (recommended for money):
      finalAmount = finalAmount.toFixed(2);

      formData.append("TransactionAmount", finalAmount.toString());

      const serviceNames = bookings.map((x) => x.serviceName).join(", ");
      const bookingIds = bookings.map((x) => x.id).join(" , ");

      formData.append("IDS", bookingIds ?? "");
      formData.append("OrderName", serviceNames || "");

      try {
        const result = await paymentStore.initiatePayment(formData);

        if (result?.status === "success") {
          bookings.map((b) =>
            bookingStore.setPaymentTypeOfBooking(b.id ?? "", type)
          ); // here should change the payment Status
          window.location.href = result.data as string;
        } else {
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
  }, [isSession, getBooking, flag, isLoading]);

  if (loadingInitial || bookings.length === 0) {
    return <LoadingSpinner />;
  }

  const totalPrice = Array.isArray(bookings)
    ? bookings.reduce((sum, x) => sum + (Number(x?.totalPrice) || 0), 0)
    : 0;

  // const handleGooglePaySuccess = async (paymentData: any) => {
  //   console.log("data to check", paymentData);
  //   // // Send payment data to your API for processing (backend)
  //   // try {
  //   //   const response = await paymentStore.processGooglePayPayment(paymentData);
  //   //   if (response?.status === "success") {
  //   //     toast.success("Payment successful!");
  //   //     await handleConfirmBooking();
  //   //   } else {
  //   //     toast.error("Payment processing failed.");
  //   //   }
  //   // } catch (error) {
  //   //   toast.error("Error processing payment.");
  //   // }
  // };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="custom-container mx-auto px-4 py-8 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Customer Information */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 border border-gray-300 h-full">
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
                  {bookings[0]?.address && (
                    <p>
                      <strong>Address:</strong> {bookings[0]?.address}
                    </p>
                  )}
                  <p>
                    <strong>Booking time:</strong>{" "}
                    {formatDateTime(bookings[0]?.bookingDate.toString())}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Services Summary */}
            <div className="lg:col-span-5 border border-gray-300 h-full">
              <div className="bg-white p-6">
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
            <div className="col-span-12 lg:col-start-8 lg:col-span-5 bg-white p-6 mt-6 border border-gray-300">
              <h3 className="text-left lg:text-right text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Payment Method
              </h3>

              {/* Show radio buttons if paymentType is not selected, otherwise show the selected payment type */}
              {!bookings[0].paymentType ? (
                <div className="flex flex-col items-start lg:items-end space-y-3">
                  <div className="flex flex-col lg:flex-col items-center space-y-2 lg:space-y-2 ">
                    {/* Direct Payment with Cash Icon */}
                    <label className="flex items-center space-x-2.5  p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 w-full lg:w-auto">
                      <i className="fas fa-money-bill-wave text-2xl text-green-500"></i>{" "}
                      {/* Cash icon with green color */}
                      <input
                        type="radio"
                        name="paymentType"
                        value="Direct"
                        checked={paymentType === "Direct"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-lg text-gray-800">
                        Direct Payment
                      </span>
                    </label>

                    {/* Online Payment with Etisalat Icon */}
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 w-full lg:w-auto">
                      <img
                        src="/assets/img/etisalatLogo.gif"
                        alt="Etisalat"
                        className="w-8 h-8"
                      />{" "}
                      {/* Etisalat icon with blue color */}
                      <input
                        type="radio"
                        name="paymentType"
                        value="Online"
                        checked={paymentType === "Online"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-lg text-gray-800">
                        Online Payment
                      </span>
                    </label>
                    {/* <div className="flex justify-center py-4 px-9 w-full lg:w-auto border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                      <GooglePayButton
                        environment="TEST"
                        buttonColor="white"
                        buttonType="short"
                        paymentRequest={{
                          apiVersion: 2,
                          apiVersionMinor: 0,
                          allowedPaymentMethods: [
                            {
                              type: "CARD",
                              parameters: {
                                allowedAuthMethods: [
                                  "PAN_ONLY",
                                  "CRYPTOGRAM_3DS",
                                ],
                                allowedCardNetworks: ["MASTERCARD", "VISA"],
                              },
                              tokenizationSpecification: {
                                type: "PAYMENT_GATEWAY",
                                parameters: {
                                  gateway: "stripe",
                                  gatewayMerchantId: "acct_1R53foLZVH34SsAp",
                                },
                              },
                            },
                          ],
                          merchantInfo: {
                            merchantId: "7215-7443-7363",
                            merchantName: "Demo Merchant",
                          },
                          transactionInfo: {
                            totalPriceStatus: "FINAL",
                            totalPriceLabel: "Total",
                            totalPrice: totalPrice.toString(),
                            currencyCode: "AED",
                            countryCode: "AE",
                          },
                        }}
                        onLoadPaymentData={handleGooglePaySuccess}
                        className="w-full lg:w-auto"
                      />
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">
                  <p>
                    You have already selected the payment method:{" "}
                    <strong>{bookings[0].paymentType}</strong>
                  </p>
                  <p className="text-sm">
                    If you want to change it, please contact support.
                  </p>
                </div>
              )}

              {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
          </div>

          {/* Buttons */}
          {!bookings[0].paymentType && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => navigate("/services")}
                className="w-1/2 lg:w-1/6 bg-gray-300 text-gray-800 py-2 font-semibold hover:bg-gray-400"
              >
                Add More
              </button>
              <button
                onClick={onConfirmClick}
                className="w-1/2 lg:w-1/6 bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default observer(BookingCheckout);
