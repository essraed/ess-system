import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { set_is_mobile_sidebar } from "../../core/data/redux/action";
import { useDispatch, useSelector } from "react-redux";
import NotificationsDropdown from "./NotificationsDropdown";
import { Navbar } from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";

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
    userStore: {
      isAdmin,
      logout,
      isLoggedIn,
      user,
      isUser,
      isMarketUser,
      isMarketingManager,
    },
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
          <div className="flex flex-nowrap items-center justify-start md:justify-between">
            {/* Logo Section */}
            <div className="w-full md:w-1/4 flex items-center justify-center md:justify-start py-2">
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  lazyLoad={true}
                  src="assets/img/ESSLogo1.png"
                  className="w-auto max-h-16 object-contain"
                  alt="Logo"
                />
              </Link>
            </div>

            <div className="flex">
              <div
                className={
                  isSession
                    ? "w-full md:w-3/4 flex flex-wrap justify-end items-center space-x-4 bookings-container flex-row hidden md:block"
                    : "w-full md:w-3/4 flex flex-wrap justify-end items-center space-x-4 bookings-container1 flex-row hidden md:block"
                }
              ></div>

              {/* Navbar Items Section */}
              <div
                className={
                  isSession
                    ? "w-full md:w-3/4 flex flex-wrap justify-end items-center space-x-4 bookings-container flex-row"
                    : "w-full md:w-3/4 flex flex-wrap justify-end items-center space-x-4 bookings-container1 flex-row"
                }
              >
                <ul className="flex flex-nowrap justify-end items-center bookings-container space-x-4 md:space-x-3">
                  <li className="nav-item px-3 py-2 hover:text-green-600 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-in-out hidden lg:block">
                    <a
                      href="https://wa.me/971501234567" // Replace with your WhatsApp number in international format
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-gray-700 font-medium flex items-center gap-2"
                    >
                      <FaWhatsapp className="text-xl" />
                      +971(04)3426666
                    </a>
                  </li>
                  {/* Session Related Links */}
                  {isSession && !isLoggedIn && (
                    <li className="hidden md:block">|</li>
                  )}
                  {isSession && !isLoggedIn && (
                    <>
                      <li className="nav-item px-3">
                        <Link
                          className="nav-link header-login hover:scale-105 transition-all duration-200 flex items-center"
                          to={`/listings/booking/view/${isSession[0]}`}
                        >
                          <span className="relative inline-block">
                            <i className="fas fa-calendar-alt text-2xl md:text-3xl text-gray-800 hover:text-blue-500"></i>
                            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {isSession.length}
                            </span>
                          </span>
                        </Link>
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
                      <li className="text-gray-500 hidden md:block">|</li>
                      <li className="nav-item px-3 py-2 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-in-out">
                        <Link
                          className="nav-link header-login text-gray-700 font-medium"
                          to="#"
                        >
                          {user?.displayName}
                        </Link>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
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
                    src="assets/img/ESSLogo.png"
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
              <div className="lg:flex justify-between">
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
                    <Link to={routes.aboutUs}>{t("About")}</Link>
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
                      {categories?.map((item, index) => {
                        const servicePath = `/services/${item.name.replace(/\s+/g, "-")}/${item.id}`;

                        return (
                          <li
                            key={index}
                            className={
                              locationPathname === servicePath ? "active" : ""
                            }
                          >
                            <Link
                              to={servicePath}
                              onClick={() => setLocationPathname(servicePath)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}

                      <li
                        className={
                          locationPathname === `/services` ? "active" : ""
                        }
                      >
                        <Link
                          to="/services"
                          onClick={() => setLocationPathname("/services")}
                        >
                          All Services
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {(isUser() || isAdmin() || isMarketingManager()) && (
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
                        {isAdmin() && (
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
                        )}
                        {isAdmin() && (
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
                        )}

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
                        {isAdmin() && (
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
                        )}
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
                        {isAdmin() && (
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
                        )}
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
                        <li
                          className={
                            locationPathname === routes.lostDashboard
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={routes.lostDashboard}
                            onClick={() =>
                              setLocationPathname(routes.lostDashboard)
                            }
                          >
                            {t("Lost List")}
                          </Link>
                        </li>

                        <li
                          className={
                            locationPathname === routes.ComplaintDashboard
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={routes.ComplaintDashboard}
                            onClick={() =>
                              setLocationPathname(routes.ComplaintDashboard)
                            }
                          >
                            {t("Complaint List")}
                          </Link>
                        </li>

                        {(isAdmin() || isMarketingManager()) && (
                          <li
                            className={
                              locationPathname === routes.blogDashboard
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={routes.blogDashboard}
                              onClick={() =>
                                setLocationPathname(routes.blogDashboard)
                              }
                            >
                              {t("Blog List")}
                            </Link>
                          </li>
                        )}
                        {(isAdmin() || isMarketingManager()) && (
                          <li
                            className={
                              locationPathname === routes.testimonialsDashboard
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={routes.testimonialsDashboard}
                              onClick={() =>
                                setLocationPathname(
                                  routes.testimonialsDashboard
                                )
                              }
                            >
                              {t("Testimonial List")}
                            </Link>
                          </li>
                        )}
                        {isAdmin() && (
                          <li
                            className={
                              locationPathname === routes.EventDashboard
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={routes.EventDashboard}
                              onClick={() =>
                                setLocationPathname(routes.EventDashboard)
                              }
                            >
                              {t("Event List")}
                            </Link>
                          </li>
                        )}

                        {isAdmin() && (
                          <li
                            className={
                              locationPathname === routes.UserDashboard
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={routes.UserDashboard}
                              onClick={() =>
                                setLocationPathname(routes.UserDashboard)
                              }
                            >
                              {t("User List")}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )}

                  {isMarketUser() && (
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
                            locationPathname === routes.blogDashboard
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            to={routes.blogDashboard}
                            onClick={() =>
                              setLocationPathname(routes.blogDashboard)
                            }
                          >
                            {t("Blog List")}
                          </Link>
                        </li>
                          <li
                            className={
                              locationPathname === routes.testimonialsDashboard
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={routes.testimonialsDashboard}
                              onClick={() =>
                                setLocationPathname(
                                  routes.testimonialsDashboard
                                )
                              }
                            >
                              {t("Testimonial List")}
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
                  <li
                    className={
                      location.pathname === routes.Losts ? "active" : ""
                    }
                  >
                    <Link to={routes.Losts}>{t("Lost & Found")}</Link>
                  </li>
                  <li
                    className={
                      location.pathname === routes.Complaints ? "active" : ""
                    }
                  >
                    <Link to={routes.Complaints}>
                      {t("Complaints & Suggestions")}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === routes.OurTeam ? "active" : ""
                    }
                  >
                    <Link to={routes.OurTeam}>{t("Our Team")}</Link>
                  </li>
                  <li
                    className={
                      location.pathname === routes.Gallery ? "active" : ""
                    }
                  >
                    <Link to={routes.Gallery}>{t("Our Gallery")}</Link>
                  </li>
                  <li
                    className={
                      location.pathname === routes.blogs ? "active" : ""
                    }
                  >
                    <Link to={routes.blogs}>{t("Our Blogs")}</Link>
                  </li>
                  <li
                    className={
                      location.pathname === routes.testimonials ? "active" : ""
                    }
                  >
                    <Link to={routes.testimonials}>{t("Reviews")}</Link>
                  </li>
                </ul>
                <ul className="hidden lg:block">
                  {!isMarketUser() && (
                    <li
                      className={
                        location.pathname === routes.notificationDropdown
                          ? "active w-0 h-0"
                          : " w-0 h-0"
                      }
                    >
                      <Navbar className="text-slate-300 flex  ">
                        {/* Other Navbar Items */}
                        <NotificationsDropdown />
                      </Navbar>
                    </li>
                  )}
                </ul>
              </div>
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
