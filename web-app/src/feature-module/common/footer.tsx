import React, { useEffect } from "react";
import { all_routes } from "../router/all_routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

const Footer = () => {
  const routes = all_routes;

  const { t } = useTranslation();

  const {
    categoryStore: { categories, loadCategories },
  } = useStore();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  AOS.init();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const handleScroll = () => {
    AOS.refresh();
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Main content wrapper with space for footer */}
      <div className="main-content">{/* Your other page content */}</div>

      {/* Footer */}
      <footer className="footer">
        {/* Footer Top */}
        <div className="footer-top aos hidden md:block" data-aos="fade-down">
          <div className="custom-container ">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-menu">
                      <h5 className="footer-title">{t("About Company")}</h5>
                      <ul>
                        <li>
                          <Link to={routes.aboutUs}>{t("Our Company")}</Link>
                        </li>
                        <li>
                          <Link to={routes.allServices}>{t("Services")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.contactUs}>{t("Contact")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.businessSetup}>
                            {t("Business Setup")}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* /Footer Widget */}
                  </div>

                  <div className="col-lg-6 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-menu">
                      <h5 className="footer-title">{t("Quick links")}</h5>
                      <ul>
                        <li>
                          <Link to={all_routes.PrivacyPolicy}>
                            {t("Privacy Policy")}
                          </Link>
                        </li>
                        <li>
                          <Link to={all_routes.Faq}>{t("Faq")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.ReturnPolicy}>{t("Return Policy")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.TermsAndConditions}>{t("Terms & Conditions")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.CookiePolicy}>{t("Cookie Policy")}</Link>
                        </li>
                        <li>
                          <Link to={all_routes.Disclaimer}>{t("Disclaimer")}</Link>
                        </li>
                      </ul>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-contact footer-widget">
                  <h5 className="footer-title">{t("Contact Info")}</h5>
                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <span>
                        <i className="feather icon-phone-call" />
                      </span>
                      <div className="addr-info">
                        <Link to="tel:+1(888)7601940">+ 971 (04) 342 6666</Link>
                      </div>
                    </div>
                    <div className="footer-address">
                      <span>
                        <i className="feather icon-mail" />
                      </span>
                      <div className="addr-info">
                        <Link to="mailto:support@example.com">info@ess.ae</Link>
                      </div>
                    </div>
                    <div className="footer-address">
                      <span>
                        <i className="feather icon-map-pin" />
                      </span>
                      <div className="addr-info">
                        <a
                          href="https://www.google.com/maps?q=Office+403,+Al+Karama+Business+Center,+Dubai,+UAE"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Building, Al Fajer Residence - 9 19DStreet - opposite
                          Karama Post Office - Al Karama - Dubai
                        </a>
                      </div>
                    </div>

                    <div className="update-form">
                      <form action="#">
                        <span>
                          <i className="feather icon-mail" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={t("Enter You Email Here")}
                        />
                        <button type="submit" className="btn btn-subscribe">
                          <span>
                            <i className="feather icon-send" />
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="footer-social-widget">
                    <ul className="nav-social">
                      <li>
                        <Link to="https://www.facebook.com/profile.php?id=61575707855912">
                          <i className="fa-brands fa-facebook-f fa-facebook fi-icon" />
                        </Link>
                      </li>
                      <li>
                        <Link to="https://www.instagram.com/karamacenter.ae/">
                          <i className="fab fa-instagram fi-icon" />
                        </Link>
                      </li>
                      <li>
                        <Link to="https://www.tiktok.com/@karamacenter.ae?is_from_webapp=1&sender_device=pc">
                          <i className="fab fa-tiktok fi-icon" />
                        </Link>
                      </li>
                      <li>
                        <Link to="https://www.linkedin.com/company/karamacenter-ae/">
                          <i className="fab fa-linkedin fi-icon" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Footer Top */}
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            {/* Copyright */}
            <div className="copyright">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="copyright-text">
                    <p>
                      {t(
                        "© 2024 Karama Business Center. All Rights Reserved."
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Copyright Menu */}
                  <div className="copyright-menu">
                    <div className="vistors-details">
                      <ul className="d-flex">
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              lazyLoad={true}
                              className="img-fluid"
                              src="assets/img/icons/paypal.svg"
                              alt="Paypal"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              lazyLoad={true}
                              className="img-fluid"
                              src="assets/img/icons/visa.svg"
                              alt="Visa"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              lazyLoad={true}
                              className="img-fluid"
                              src="assets/img/icons/master.svg"
                              alt="Master"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              lazyLoad={true}
                              className="img-fluid"
                              src="assets/img/icons/applegpay.svg"
                              alt="applegpay"
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Copyright Menu */}
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
        {/* /Footer Bottom */}
      </footer>
      {/* /Footer */}
    </>
  );
};

export default observer(Footer);