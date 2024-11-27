
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const routes = all_routes;

  const {
    userStore: { isAdmin, logout, isLoggedIn },
    categoryStore: { categories, loadCategories }
  } = useStore();

  useEffect(() => {
    loadCategories()
  }, [loadCategories])


  return (
    <>
      <header className="header">
        <div className="custom-container">
          <div className="row">
            <div className="col-md-6 col-6">
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  src="assets/img/ESSLogo.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-md-6 col-6 rightLogo">


              <ul className="nav header-navbar-rht">

                <li className="nav-item">
                  <LanguageSelector />
                </li>
                <li>|</li>
                <li className="contact-number nav-item pe-4 ">
                  <a className="fw-bold" href="https://api.whatsapp.com/send?phone=97143426666" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp pe-2"></i>+(971) 342-6666</a>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link className="nav-link header-login" to="#" onClick={logout}>
                      <span>
                        <i className="fa-regular fa-user" />
                      </span>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link header-login" to={routes.login}>
                      <span>
                        <i className="fa-regular fa-user" />
                      </span>
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>


            </div>

          </div>

        </div>
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="custom-container">
            <div className="navbar-header">
              {/* handleClick */}
              <Link id="mobile_btn" to="#" onClick={() => { }}>
                <span className="bar-icon">
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
                    src="assets/img/ESS KBC LOGO transparent-01-01.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link
                  id="menu_close"
                  className="menu-close"
                  to="#"
                  onClick={() => { }}
                >
                  {/* handleClick */}
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <li
                  className={
                    location.pathname.includes(routes.homeOne) ? "active" : ""
                  }
                >
                  <Link to={routes.homeOne}>Home</Link>
                </li>

                <li
                  className={
                    location.pathname.includes(routes.aboutUs) ? "active" : ""
                  }
                >
                  <Link to={routes.aboutUs}>Aboutus</Link>
                </li>

                <li
                  // we need update the condition here for active
                  className={`has-submenu ${location.pathname.includes("services") ? "active" : ""}`}
                >
                  <Link to="#">
                    Booking Services <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">
                    {categories?.map((item, index) => (
                      <li
                        key={index}
                        className={
                          location.pathname.includes("sdsadasd")
                            ? "active"
                            : ""
                        }
                      >
                        <Link to={routes.letterDashboard}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {isAdmin() && <li
                  className={`has-submenu ${location.pathname.includes("listing") ? "active" : ""}`}
                >
                  <Link to="#">
                    Dashboards <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="submenu">

                    <li
                      className={
                        location.pathname.includes(routes.letterDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.letterDashboard}>Letter List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.serviceDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.serviceDashboard}>Service List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.categoryDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.categoryDashboard}>Category List</Link>
                    </li>

                    <li
                      className={
                        location.pathname.includes(routes.authorityDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.authorityDashboard}>Authority List</Link>
                    </li>

                    <li
                      className={
                        location.pathname.includes(routes.carDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.carDashboard}>Car List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.notificationDashboard)

                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.notificationDashboard}>
                        Notification List
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.bookingDashboard)

                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.bookingDashboard}>Booking List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.WorkingTimeDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.WorkingTimeDashboard}>
                        WorkingTime List
                      </Link>
                    </li>
                  </ul>
                </li>}

                <li
                  className={
                    location.pathname.includes(routes.contactUs) ? "active" : ""
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
          </div>
        </nav>
      </header>
    </>
  );
};

export default observer(Header);
