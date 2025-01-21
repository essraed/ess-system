import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import { all_routes } from "../router/all_routes";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [TransactionID, setTransactionID] = useState("");

  useEffect(() => {
    if (!status && !TransactionID) {
      const paymentStatus = searchParams.get("status");
      const paymentTransactionID = searchParams.get("TransactionID");

      setStatus(paymentStatus ?? "");
      setTransactionID(paymentTransactionID ?? "");

      const cleanURL = window.location.pathname;
      window.history.replaceState(null, "", cleanURL);
    }
  }, [searchParams, status, TransactionID]);

  const getStatusMessage = () => {
    switch (status) {
      case "Completed":
        return "Your payment was successful! 🎉";
      case "Failed":
        return "Oops! Payment failed. Try again.";
      case "Pending":
        return "Payment was canceled.";
      default:
        return "Transaction status is unknown.";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "Completed":
        return "✔️"; // Success icon
      case "Failed":
        return "❌"; // Failure icon
      case "Pending":
        return "❗"; // Canceled icon
      default:
        return "🔍"; // Unknown icon
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center m-5 items-center  bg-white">
        <div
          className={`w-full sm:w-2/3 p-5 ${getStatusClass()} flex flex-col items-center`}
        >
          <div className="text-3xl mb-2">{getIcon()}</div>
          <h1 className="text-xl font-medium text-center text-gray-800 mb-2">
            Payment Status
          </h1>
          <p className="text-md text-center text-gray-600 mb-2">
            {getStatusMessage()}
          </p>
          <div className="text-sm text-center text-gray-500 mb-2">
            <p>
              <strong>Transaction ID:</strong> {TransactionID}
            </p>
          </div>
          <div className="w-full flex justify-center mt-2">
            <Link to={all_routes.homeOne} className="btn btn-dark">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
