import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useTranslation } from "react-i18next";
import {
  COMPANY_LOCATION,
  COMPANY_MAIL,
  COMPANY_NAME,
  COMPANY_PHONE_NUMBER,
} from "../../environment";

const ServiceDetailSidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="col-lg-4 theiaStickySidebar">
      <div className="stickybar bg-white p-6 rounded-lg shadow-md">
        {/* Owner Details Section */}

        <div className="owner-details mb-6">
          <h4 className="text-xl font-semibold text-gray-800">{t('Contact Us')}</h4>
          <div className="owner-info flex items-center mt-4">
            <div className="owner-img mr-4">
              <Link to="#">
                <ImageWithBasePath lazyLoad={true} src="assets/img/logo.svg" alt="User" className="w-16 h-16 rounded-full" />
              </Link>
            </div>
            <div className="owner-text">
              <h5 className="text-lg font-semibold text-gray-700">{COMPANY_NAME}</h5>
              <div className="rating flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fas fa-star text-yellow-500" />
                ))}
                <span className="ml-2 text-gray-600">(4.3)</span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-gray-700">For Inquiries</h5>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info mb-6">
          {/* Email */}
          <div className="contact-item mb-4">
            <h5 className="text-sm font-semibold text-gray-700">
              {t("Email")}
            </h5>
            <a
              href={`mailto:${COMPANY_MAIL}`}
              className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <i className="fas fa-envelope mr-2 text-gray-500" />
              {COMPANY_MAIL}
            </a>
          </div>

          {/* Phone Number */}
          <div className="contact-item mb-4">
            <h5 className="text-sm font-semibold text-gray-700">
              {t("Phone Number")}
            </h5>
            <a
              href={`tel:${COMPANY_PHONE_NUMBER}`}
              className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <i className="fas fa-phone-alt mr-2 text-gray-500" />
              {COMPANY_PHONE_NUMBER}
            </a>
          </div>

          {/* Location */}
          <div className="contact-item mb-4">
            <h5 className="text-sm font-semibold text-gray-700">
              {t("Location")}
            </h5>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt mr-2 text-gray-500" />
              {t(COMPANY_LOCATION)}
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Button */}
        <div className="whatsapp-button mt-6">
          <a
            href="https://api.whatsapp.com/send?phone=97143426666"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <i className="fab fa-whatsapp" />
            <span>{COMPANY_PHONE_NUMBER}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailSidebar;
