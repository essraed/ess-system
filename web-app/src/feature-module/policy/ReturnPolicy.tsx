import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Breadcrumbs from "../common/breadcrumbs";

const ReturnPolicy = () => {
  return (
    <div className="main-wrapper">
      <Header />
      {/* <Breadcrumbs title="Return Policy" subtitle="Pages" /> */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white shadow-md p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
              Return & Refund Policy
            </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Service Cancellation and Refund Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              At <span className="font-semibold">Karama Business Center (KBC)</span>,
              customer satisfaction is our top priority. We strive to deliver
              reliable and timely services. In cases where you need to cancel or
              are not satisfied, please review the following policy:
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
              <li>
                Cancellation or rescheduling must be requested at least{" "}
                <span className="font-medium text-gray-900">24 hours in advance</span>{" "}
                by phone or email.
              </li>
              <li>
                Refunds are only applicable if the service has{" "}
                <span className="font-medium text-gray-900">not yet started</span> or
                if a fault on our part prevented service delivery.
              </li>
              <li>
                Services that have already started (e.g., medical screening,
                documentation) are considered{" "}
                <span className="font-medium text-gray-900">non-refundable</span>.
              </li>
              <li>
                Refunds are processed within{" "}
                <span className="font-medium text-gray-900">5–10 business days</span>{" "}
                using the original payment method.
              </li>
              <li>
                Administrative or third-party charges may be{" "}
                <span className="font-medium text-gray-900">non-refundable</span> even
                if an appointment is canceled.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Contact Us for Refunds or Cancellations:
            </h3>

            <div className="space-y-2 text-gray-700 mb-2">
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:info@ess.ae"
                  className="text-blue-600 hover:underline font-medium"
                >
                  info@ess.ae
                </a>
              </p>
              <p>
                📞 Phone:{" "}
                <a
                  href="tel:+97143426666"
                  className="text-blue-600 hover:underline font-medium"
                >
                  +(971) 4342-6666
                </a>
              </p>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Be sure to include your full name, appointment details, and reason for
              cancellation in your message.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
