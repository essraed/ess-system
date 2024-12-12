import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { COMPANY_PHONE_NUMBER } from "../../environment";

import { set_is_mobile_sidebar } from "../../core/data/redux/action";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const routes = all_routes;

  const location = useLocation();

  const dispatch = useDispatch();

  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);

  const handleClick = () => {
    dispatch(set_is_mobile_sidebar(!mobileSidebar));
  };

  // Separate submenu states
  const [bookingServicesSubmenu, setBookingServicesSubmenu] = useState(false);
  const [dashboardsSubmenu, setDashboardsSubmenu] = useState(false);

  const toggleBookingServicesSubmenu = () => {
    setBookingServicesSubmenu(!bookingServicesSubmenu);
    setDashboardsSubmenu(false);
  };

  const toggleDashboardsSubmenu = () => {
    setDashboardsSubmenu(!dashboardsSubmenu);
    setBookingServicesSubmenu(false);
  };

  const [locationPathname, setLocationPathname] = useState(location.pathname);

  const {
    userStore: { isAdmin, logout, isLoggedIn, user },
    categoryStore: { categories, loadCategories },
    bookingStore: { isSession, getCurrentSessionBookings },
  } = useStore();

  useEffect(() => {
    loadCategories();
    getCurrentSessionBookings();
  }, [loadCategories]);

  const { t } = useTranslation();
  return (
    <>
      <header className="header">
        <div className="custom-container ">
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo Section */}
            <div className="w-1/2 mr-24 md:w-1/4 md:mr-0">
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  lazyLoad={true}
                  src="assets/img/ESSLogo.png"
                  className="img-fluid "
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Navbar Items Section */}
            <div className="w-full md:w-3/4 flex flex-wrap justify-end items-center space-x-4 bookings-container">
              <ul className="flex flex-wrap justify-end items-center bookings-container ">
                {/* {location.pathname === routes.letterCreate ? (
                  <>
                    <li className="nav-item px-2">
                      <LanguageSelector />
                    </li>
                    <li>|</li>
                  </>
                ) : null} */}
                {isSession && !isAdmin() && (
                  <>
                    <li className="nav-item">
                      {isSession.length === 1 ? (
                        <Link
                          className="nav-link header-login px-0 hover:scale-105 transition-all duration-200 flex items-center "
                          to={`/listings/booking/view/${isSession[0]}`}
                        >
                          <span className="relative">
                            <i className="fas fa-calendar-alt text-2xl md:text-3xl text-gray-800 hover:text-blue-500"></i>
                            <span
                              className="absolute bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                              style={{
                                transform: "translate(50%, -50%)",
                              }}
                            >
                              {isSession.length}
                            </span>
                          </span>
                        </Link>
                      ) : (
                        <div className="dropdown relative">
                          <Link
                            className="nav-link header-login px-0 hover:scale-110 transition-transform duration-200 dropdown-toggle flex items-center justify-center"
                            to="#"
                            id="sessionDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="relative inline-block">
                              <i className="fas fa-calendar-alt text-2xl md:text-3xl text-gray-800 hover:text-blue-500"></i>
                              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {isSession.length}
                              </span>
                            </span>
                          </Link>
                          <ul
                            className="dropdown-menu absolute z-10 mt-2 bg-white shadow-lg rounded-md py-2 w-30"
                            aria-labelledby="sessionDropdown"
                          >
                            {isSession
                              .slice()
                              .reverse()
                              .map((sessionId, index) => (
                                <li key={index} className="block">
                                  <Link
                                    className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                                    to={`/listings/booking/view/${sessionId}`}
                                  >
                                    {t(`Booking  ${index + 1}`)}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  </>
                )}

                {/* Authentication Links */}
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login px-3 py-2 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out flex items-center"
                        to="#"
                        onClick={logout}
                      >
                        <span className="mx-2">
                          <i className="fa-regular fa-user text-lg" />
                        </span>
                        <span className="font-semibold">{t("Logout")}</span>
                      </Link>
                    </li>
                    <li className="text-gray-500 ">|</li>
                    <li className="nav-item px-3 py-2  hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-in-out">
                      <Link
                        className="nav-link header-login text-gray-700 font-medium "
                        to="#"
                      >
                        {user?.username}
                      </Link>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="custom-container">
            <div className="navbar-header bookings-container-mobilebutton">
              {/* handleClick */}
              <Link id="mobile_btn" to="#" onClick={handleClick}>
                <span className="bar-icon mt-3 mr-3">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to={routes.homeOne} className="menu-logo">
                  <ImageWithBasePath
                    lazyLoad={true}
                    src="assets/img/ESS KBC LOGO transparent-01-01.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link
                  id="menu_close"
                  className="menu-close"
                  to="#"
                  onClick={handleClick}
                >
                  {/* handleClick */} <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <li
                  className={
                    location.pathname === routes.homeOne ? "active" : ""
                  }
                >
                  <Link to={routes.homeOne}>{t("Home")}</Link>
                </li>

                <li
                  className={
                    location.pathname.includes(routes.aboutUs) ? "active" : ""
                  }
                >
                  <Link to={routes.aboutUs}>{t("Aboutus")}</Link>
                </li>

                <li
                  // we need update the condition here for active
                  className={`has-submenu ${location.pathname.includes("services/") ? "active" : ""}`}
                >
                  <Link to="#" onClick={toggleBookingServicesSubmenu}>
                    {t("Booking Services")}{" "}
                    <i className="fas fa-chevron-down" />
                  </Link>
                  <ul
                    className={`submenu ${
                      bookingServicesSubmenu ? "d-block" : "d-none"
                    }`}
                  >
                    {categories?.map((item, index) => (
                      <li
                        key={index}
                        className={
                          locationPathname === `/services/${item.id}`
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={`/services/${item.id}`}
                          onClick={() =>
                            setLocationPathname(`/services/${item.id}`)
                          }
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={
                        locationPathname === `/services` ? "active" : ""
                      }
                    >
                      <Link
                        to={`/services`}
                        onClick={() => setLocationPathname(`/services`)}
                      >
                        All Services
                      </Link>
                    </li>
                  </ul>
                </li>

                {isAdmin() && (
                  <li
                    className={`has-submenu ${location.pathname.includes("listing") ? "active" : ""}`}
                  >
                    <Link to="#" onClick={toggleDashboardsSubmenu}>
                      {t("Dashboards")} <i className="fas fa-chevron-down" />
                    </Link>
                    <ul
                      className={`submenu ${
                        dashboardsSubmenu ? "d-block" : "d-none"
                      }`}
                    >
                      <li
                        className={
                          locationPathname === routes.letterDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.letterDashboard}
                          onClick={() =>
                            setLocationPathname(routes.letterDashboard)
                          }
                        >
                          {t("Letter List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.serviceDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.serviceDashboard}
                          onClick={() =>
                            setLocationPathname(routes.serviceDashboard)
                          }
                        >
                          {t("Service List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.categoryDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.categoryDashboard}
                          onClick={() =>
                            setLocationPathname(routes.categoryDashboard)
                          }
                        >
                          {t("Category List")}
                        </Link>
                      </li>

                      <li
                        className={
                          locationPathname === routes.authorityDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.authorityDashboard}
                          onClick={() =>
                            setLocationPathname(routes.authorityDashboard)
                          }
                        >
                          {t("Authority List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.carDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.carDashboard}
                          onClick={() =>
                            setLocationPathname(routes.carDashboard)
                          }
                        >
                          {t("Car List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.notificationDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.notificationDashboard}
                          onClick={() =>
                            setLocationPathname(routes.notificationDashboard)
                          }
                        >
                          {t("Notification List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.bookingDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.bookingDashboard}
                          onClick={() =>
                            setLocationPathname(routes.bookingDashboard)
                          }
                        >
                          {t("Booking List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.WorkingTimeDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.WorkingTimeDashboard}
                          onClick={() =>
                            setLocationPathname(routes.WorkingTimeDashboard)
                          }
                        >
                          {t("WorkingTime List")}
                        </Link>
                      </li>
                      <li
                        className={
                          locationPathname === routes.contactDashboard
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to={routes.contactDashboard}
                          onClick={() =>
                            setLocationPathname(routes.contactDashboard)
                          }
                        >
                          {t("Contact List")}
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                <li
                  className={
                    location.pathname.includes(routes.businessSetup)
                      ? "active"
                      : ""
                  }
                >
                  <Link to={routes.businessSetup}>{t("Business Setup")}</Link>
                </li>

                <li
                  className={
                    location.pathname === routes.contactUs ? "active" : ""
                  }
                >
                  <Link to={routes.contactUs}>{t("Contact")}</Link>
                </li>
                <li className="login-link">
                  <Link to={routes.register}>{t("Sign Up")}</Link>
                </li>
                <li className="login-link">
                  <Link to={routes.login}>{t("Sign In")}</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <AnimatedCursor color='8, 113, 128' innerStyle={{
            zIndex: '1'
          }} /> */}
        </nav>
      </header>
    </>
  );
};

export default observer(Header);
