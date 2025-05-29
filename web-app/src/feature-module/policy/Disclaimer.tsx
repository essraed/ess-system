import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Breadcrumbs from "../common/breadcrumbs";

const Disclaimer = () => {
  return (
    <div className="main-wrapper">
      <Header />
      {/* <Breadcrumbs title="Disclaimer" subtitle="Pages" /> */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white shadow-md rounded-xl p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
              Disclaimer
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6">
              The information on{" "}
              <a
                href="https://www.kbc.center"
                className="text-blue-600 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.kbc.center
              </a>{" "}
              is provided for general informational purposes only.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              While we strive to keep our content up to date and accurate, we make
              no warranties—express or implied—about the completeness, accuracy,
              reliability, or availability of any information presented.
            </p>

            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
              <li>
                Any reliance you place on such information is strictly at your own risk.
              </li>
              <li>
                We are not liable for any loss or damage that may occur from using this website.
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              For the most accurate and up-to-date information about our services, we recommend
              contacting us directly through our official communication channels.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Disclaimer;
