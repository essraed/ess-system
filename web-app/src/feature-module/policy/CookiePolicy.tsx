import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Breadcrumbs from "../common/breadcrumbs";

const CookiePolicy = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Breadcrumbs title="Cookie Policy" subtitle="Pages" />
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white shadow-md rounded-xl p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
              Cookie Policy
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookie Usage Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Karama Business Center uses cookies on{" "}
                <a
                  href="https://www.kbc.center"
                  className="text-blue-600 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.kbc.center
                </a>{" "}
                to enhance user experience. This policy outlines how and why we
                use cookies:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                What Are Cookies?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Cookies are small data files stored on your device when you
                visit a website. They help us remember user preferences and
                understand how visitors interact with our platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Types of Cookies We Use:
              </h3>
              <ul className="list-disc ml-6 space-y-4 text-gray-700 mb-6">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Required for core
                  functionalities such as secure login and session management.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Track site performance
                  and user navigation (e.g., pages visited).
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Store user preferences
                  like language and region to personalize your experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us analyze user
                  behavior using third-party tools such as Google Analytics.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Managing Cookies:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You can manage or disable cookies through your browser settings.
                However, please note that disabling cookies may affect the
                functionality and performance of some areas of our website.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
