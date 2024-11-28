import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useTranslation } from "react-i18next";
import { COMPANY_LOCATION, COMPANY_MAIL, COMPANY_NAME, COMPANY_PHONE_NUMBER } from "../../environment";

const ServiceDetailSidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="col-lg-4 theiaStickySidebar">
      <div className="stickybar">

        <div className="review-sec extra-service mt-0">
          <div className="review-header">
            <h4>{t('Owner Details')}</h4>
          </div>
          <div className="owner-detail">
            <div className="owner-img">
              <Link to="#">
                <ImageWithBasePath

                  lazyLoad={true} src="assets/img/logo.svg" alt="User" />
              </Link>
              <span className="badge-check">
                <ImageWithBasePath
                  lazyLoad={true} src="assets/img/logo.svg" alt="User" />
              </span>
            </div>
            <div className="reviewbox-list-rating">
              <h5>
                <Link to={""}>{t(COMPANY_NAME)}</Link>
              </h5>
              <p>
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <span> (4.3)</span>
              </p>
            </div>
          </div>
          <ul className="booking-list">
            <li>
              {t('Email')}
              <span className="addr-info">
                <a className="text-blue-500 underline" href={`mailto:${COMPANY_MAIL}`}>{COMPANY_MAIL}</a>
              </span>
            </li>
            <li>
              {t('Phone Number')}
              <span className="addr-info">
                <a className="text-blue-500 underline" href="tel:0523412595">{COMPANY_PHONE_NUMBER}</a>
              </span>
            </li>
            <li>
              {t('Location')}
              <span className="addr-info">{t(COMPANY_LOCATION)}</span>
            </li>
          </ul>
          <div className="message-btn font-bold">
            <a className="flex items-center gap-2 chat-link font-semibold btn btn-order" href="https://api.whatsapp.com/send?phone=97143426666" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp" />
              <div className="addr-info">{COMPANY_PHONE_NUMBER}</div>
            </a>
          </div>
        </div>
{/* 
        <div className="review-sec share-car mt-0 mb-0">
          <div className="review-header">
            <h4>{ t ('Share')}</h4>
          </div>
          <ul className="nav-social">
            <li>
              <Link to="#">
                <i className="fa-brands fa-facebook-f fa-facebook fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-instagram fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-behance fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fa-brands fa-pinterest-p fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-twitter fi-icon" />{" "}
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-linkedin fi-icon" />
              </Link>
            </li>
          </ul>
        </div> */}

      </div>
    </div>
  );
};

export default ServiceDetailSidebar;
