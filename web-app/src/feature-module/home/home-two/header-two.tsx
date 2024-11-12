import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { set_is_mobile_sidebar } from "../../../core/data/redux/action";

const HeaderTwo = () => {
  const routes = all_routes;
  const [selectedPersons, setSelectedPersons] = useState(null);
  const types = [
    { name: 'Choose Location' },
    { name: 'Newyork' }
  ];
  const bikemodal = [
    { name: 'Catamaran' },
    { name: 'Motor yachts' },
    { name: 'Sailing yachts' }
  ];
  const [SelectedModal, setSelectedModal] = useState(null);
  const location = useLocation();
  const [date1, setDate1] = useState(null);
  
  const bannerimgslideroption = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
 
  const [headerClass, setHeaderClass] = useState("header header-two");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        setHeaderClass("header header-two header-fixed");
      } else {
        setHeaderClass("header header-two");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run this effect only once on component mount
  const mobileSidebarData = useSelector((state: any) => state.mobileSidebar);

  const dispatch = useDispatch();

  const handleMobileSidebar = () => {
    dispatch(set_is_mobile_sidebar(!mobileSidebarData));
  };
  return (
    <>
    <div className="hero-sec-main">
      <header  className={headerClass} >
        <div className="header-two-top">
          <div className="container">
            <div className="header-top-items">
              <ul className="header-address">
                <li>
                  <span>
                    <i className="bx bxs-phone" />
                  </span>
                  (+088) 123 456 7890
                </li>
                <li>
                  <span>
                    <i className="bx bx-map" />
                  </span>
                  5617 Glassford Street New York, NY 10000, USA
                </li>
              </ul>
              <div className="header-top-right d-flex align-items-center">
                <div className="header-top-flag-drops d-flex align-items-center">
                  <div className="header-top-drpodowns me-3">
                    <div className="dropdown header-dropdown country-flag">
                      <Link
                        className="dropdown-toggle nav-tog"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        <ImageWithBasePath src="assets/img/flags/us.png" alt="Img" />
                        English
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link to="#" className="dropdown-item">
                          <ImageWithBasePath src="assets/img/flags/fr.png" alt="Img" />
                          French
                        </Link>
                        <Link to="#" className="dropdown-item">
                          <ImageWithBasePath src="assets/img/flags/es.png" alt="Img" />
                          Spanish
                        </Link>
                        <Link to="#" className="dropdown-item">
                          <ImageWithBasePath src="assets/img/flags/de.png" alt="Img" />
                          German
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="header-top-drpodowns">
                    <div className="dropdown header-dropdown country-flag">
                      <Link
                        className="dropdown-toggle nav-tog"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        <i className="bx bx-globe me-2" />
                        USD
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link to="#" className="dropdown-item">
                          Euro
                        </Link>
                        <Link to="#" className="dropdown-item">
                          INR
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="header-top-social-links">
                  <ul>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-behance" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-pinterest-p" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
              <Link id="mobile_btn" to="#" onClick={handleMobileSidebar}>
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  src="assets/img/logo-2.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link to={routes.homeOne} className="navbar-brand logo-small">
                <ImageWithBasePath
                  src="assets/img/logo-small.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to={routes.homeOne} className="menu-logo">
                  <ImageWithBasePath
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="#">
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <li
                  className={`has-submenu ${location.pathname.includes("index") ? "active" : ""}`}
                >
                  <Link to={routes.homeOne}>
                    Home <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    <li
                      className={
                        location.pathname.includes(routes.homeOne)
                          ? ""
                          : ""
                      }
                    >
                      <Link to={routes.homeOne}>Home 1</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.homeTwo)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.homeTwo}>Home 2</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.homeThree)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.homeThree}>Home 3</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`has-submenu ${location.pathname.includes("listing") ? "active" : ""}`}
                >
                  <Link to="#">
                    Listings <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    <li
                      className={
                        location.pathname.includes(routes.listingGrid)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.listingGrid}>Listing Grid</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.listingList)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.listingList}>Listing List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.listingMap)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.listingMap}>Listing With Map</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.listingDetails)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.listingDetails}>Listing Details</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`has-submenu ${location.pathname.includes("user") ? "active" : ""}`}
                >
                  <Link to="#">
                    User <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    <li
                      className={
                        location.pathname.includes(routes.userDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userDashboard}>Dashboard</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userBookings)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userBookings}>My Bookings</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userReviews)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userReviews}>Reviews</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userWishlist)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userWishlist}>Wishlist</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userMessages)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userMessages}>Messages</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userWallet)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userWallet}>My Wallet</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userPayment)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userPayment}>Payments</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.userSettings)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.userSettings}>Settings</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`has-submenu ${location.pathname.includes("pages") ? "active" : ""}`}
                >
                  <Link to="#">
                    Pages <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    <li
                      className={
                        location.pathname.includes(routes.aboutUs)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.aboutUs}>About Us</Link>
                    </li>
                    <li className="has-submenu">
                      <Link to="#">Authentication</Link>
                      <ul className="submenu">
                        <li
                          className={
                            location.pathname.includes(routes.register)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.register}>Signup</Link>
                        </li>
                        <li
                          className={
                            location.pathname.includes(routes.login)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.login}>Signin</Link>
                        </li>
                        <li
                          className={
                            location.pathname.includes(routes.forgotPassword)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.forgotPassword}>
                            Forgot Password
                          </Link>
                        </li>
                        <li
                          className={
                            location.pathname.includes(routes.resetPassword)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.resetPassword}>Reset Password</Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`has-submenu ${
                        location.pathname.includes("booking") ||
                        location.pathname.includes("invoice")
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link to="#">Booking</Link>
                      <ul className="submenu">
                        <li
                          className={
                            location.pathname === routes.bookingCheckout
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.bookingCheckout}>
                            Booking Checkout
                          </Link>
                        </li>
                        <li
                          className={
                            location.pathname === routes.booking ? "active" : ""
                          }
                        >
                          <Link to={routes.booking}>Booking</Link>
                        </li>
                        <li
                          className={
                            location.pathname.includes(routes.invoiceDetails)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.invoiceDetails}>
                            Invoice Details
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <Link to="#">Error Page</Link>
                      <ul className="submenu">
                        <li
                          className={
                            location.pathname.includes(routes.error404)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.error404}>404 Error</Link>
                        </li>
                        <li
                          className={
                            location.pathname.includes(routes.error500)
                              ? "active"
                              : ""
                          }
                        >
                          <Link to={routes.error500}>500 Error</Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.pricing)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.pricing}>Pricing</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.faq) ? "active" : ""
                      }
                    >
                      <Link to={routes.faq}>FAQ</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.gallery)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.gallery}>Gallery</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.ourTeam)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.ourTeam}>Our Team</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.testimonial)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.testimonial}>Testimonials</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.termsConditions)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.termsConditions}>
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.privacyPolicy)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.privacyPolicy}>Privacy Policy</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.maintenance)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.maintenance}>Maintenance</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.comingSoon)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.comingSoon}>Coming Soon</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`has-submenu ${location.pathname.includes("blog") ? "active" : ""}`}
                >
                  <Link to="#">
                    Blog <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    <li
                      className={
                        location.pathname.includes(routes.blogList)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.blogList}>Blog List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.blogGrid)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.blogGrid}>Blog Grid</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.blogDetails)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.blogDetails}>Blog Details</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={
                    location.pathname.includes(routes.contactUs) ? "" : ""
                  }
                >
                  <Link to={routes.contactUs}>Contact</Link>
                </li>
                <li className="login-link">
                  <Link to={routes.register}>Sign Up</Link>
                </li>
                <li className="login-link">
                  <Link to={routes.login}>Sign In</Link>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link className="nav-link login-link" to={routes.login}>
                  <span>
                    <i className="bx bx-user me-2" />
                  </span>
                  Sign In /{" "}
                </Link>
                <Link className="nav-link login-link ms-1" to={routes.register}>
                  Register{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link header-reg" to={routes.listingList}>
                  <span>
                    <i className="bx bx-plus-circle" />
                  </span>
                  Add Listing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <>
  {/* Banner */}
  <section className="banner-section banner-sec-two banner-slider">
    <div className="banner-img-slider">
    <Slider {...bannerimgslideroption} >
      <div className="slider-img">
        <ImageWithBasePath src="assets/img/bg/home-banner-img.png" alt="Img" />
      </div>
      <div className="slider-img">
        <ImageWithBasePath src="assets/img/bg/home-banner-img-02.png" alt="Img" />
      </div>
      <div className="slider-img">
        <ImageWithBasePath src="assets/img/bg/home-banner-img-03.png" alt="Img" />
      </div>
    </Slider>
    </div>
    <div className="container">
      <div className="home-banner">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="hero-sec-contents">
              <div className="banner-title">
                <h1>
                  Online Yacht Booking.
                  <span>Made Simple.</span>
                </h1>
                <p>
                  Modern design sports cruisers for those who crave adventure
                  &amp; grandeur yachts for relaxing with your loved ones. We
                  Offer diverse and fully equipped yachts
                </p>
              </div>
              <div className="banner-form">
                <form >
                  <div className="banner-search-list">
                    <div className="input-block customdropdown">
                      <label>
                        <i className="bx bx-map" />
                        Location
                      </label>
                     
                      <Dropdown
                                value={selectedPersons}
                                onChange={(e) => setSelectedPersons(e.value)}
                                options={types}
                                optionLabel="name"
                                placeholder="Cruiser"
                                className="w-100"
                              />
                    </div>
                    <div className="input-block">
                      <label>
                        <i className="bx bx-calendar" />
                        Pickup Date
                      </label>
                      <div className="date-widget">
                        <div className="group-img customcalendar">
                        <Calendar
                          value={date1}
                          onChange={(e) => setDate1(e.value)}
                          placeholder="04/11/2023"
                        />
                          {/* <input
                            type="text"
                            className="form-control datetimepicker"
                            placeholder="04/11/2023"
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="input-block">
                      <label>
                        <i className="bx bx-calendar" />
                        Pickup Date
                      </label>
                      <div className="date-widget">
                        <div className="group-img customcalendar">
                        <Calendar
                          value={date1}
                          onChange={(e) => setDate1(e.value)}
                          placeholder="04/11/2023"
                        />
                          {/* <input
                            type="text"
                            className="form-control datetimepicker"
                            placeholder="04/11/2023"
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="input-block customdropdown">
                      <label>
                        <i className="bx bxs-ship" />
                        Yacht Type
                      </label>
                     
                      <Dropdown
                                value={SelectedModal}
                                onChange={(e) => setSelectedModal(e.value)}
                                options={bikemodal}
                                optionLabel="name"
                                placeholder="Catamaran"
                                className="w-100"
                              />
                    </div>
                  </div>
                  <div className="input-block-btn">
                    <button className="btn btn-primary" type="submit">
                      <i className="bx bx-search-alt me-2" /> Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="banner-user-group text-center">
                <ul>
                  <li>
                    <Link to="#">
                      <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="Img" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <ImageWithBasePath src="assets/img/profiles/avatar-02.jpg" alt="Img" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <ImageWithBasePath src="assets/img/profiles/avatar-03.jpg" alt="Img" />
                    </Link>
                  </li>
                  <li className="users-text">
                    <h5>6K + Customers</h5>
                    <span>has used our renting services </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-btn text-center">
        <Link to="https://www.youtube.com/embed/ExJZAegsOis" data-fancybox="">
          <span>
            <i className="bx bx-play" />
          </span>
        </Link>
        <h6>Check Our Video</h6>
      </div>
    </div>
  </section>
  {/* /Banner */}
</>

    </div>
    </>
  );
};

export default HeaderTwo;
