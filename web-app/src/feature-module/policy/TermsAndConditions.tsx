import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Breadcrumbs from "../common/breadcrumbs";

const TermsAndConditions = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Breadcrumbs title="Terms & Conditions" subtitle="Pages" />
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white shadow-md rounded-xl p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
              Terms & Conditions
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Website Terms of Use
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to Karama Business Center’s website (
                <a
                  href="https://www.kbc.center"
                  className="text-blue-600 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.kbc.center
                </a>
                ). These Terms and Conditions govern your use of our website and
                services:
              </p>

              <ol className="list-decimal space-y-6 text-gray-800 ml-5 pl-1">
                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Use of Website
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>
                      Content is for general information only. We may update or
                      remove it without notice.
                    </li>
                    <li>
                      Users must not misuse the website or attempt unauthorized
                      access.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Service Appointments
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>All bookings are subject to confirmation.</li>
                    <li>
                      KBC reserves the right to reschedule or cancel
                      appointments due to availability or operational changes.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Intellectual Property
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>
                      All content, branding, and materials are the property of
                      KBC. No unauthorized use is permitted.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Privacy and Data
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>
                      Personal data is processed in accordance with our{" "}
                      <a
                        href="/privacy-policy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </li>
                    <li>
                      We do not sell or share data without your consent, except
                      when required by law.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Limitation of Liability
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>
                      KBC is not responsible for damages arising from the use of
                      the website or service delays.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="block text-lg text-gray-900 mb-2">
                    Changes
                  </strong>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>
                      We may update these terms at any time. Please check this
                      page periodically for changes.
                    </li>
                  </ul>
                </li>
              </ol>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
