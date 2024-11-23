import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../app/stores/store";
import { Navbar } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import NotificationsDropdown from "./NotificationsDropdown";

const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  const {
    userStore: { logout, isLoggedIn, isAdmin },
  } = useStore();

  const dispatch = useDispatch();

  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);


  const [mobileSubmenu, setMobileSubmenu] = useState(false);

  const mobileSubmenus = () => {
    setMobileSubmenu(!mobileSubmenu);
  };

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link id="mobile_btn" to="#">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  src="assets/img/logo.svg"
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
                <Link
                  id="menu_close"
                  className="menu-close"
                  to="#"
                  
                >
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <li
                  className={`has-submenu ${location.pathname.includes("index") ? "active" : ""}`}
                >
                  <Link to={routes.homeOne} onClick={mobileSubmenus}>
                    Home 
                  </Link>
                  {/* <ul
                    className={`submenu ${mobileSubmenu ? "d-block" : "d-none"}`}
                  >
                    <li
                      className={
                        location.pathname.includes(routes.homeOne)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.homeOne}>Home 1</Link>
                    </li>
                  </ul> */}
                </li>
                <li
                  className={`has-submenu ${location.pathname.includes("listing") ? "active" : ""}`}
                >
                  <Link to="#">
                    Dashboard <i className="fas fa-chevron-down" />
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
                        location.pathname.includes(routes.bookingDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.bookingDashboard}>booking List</Link>
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
                        location.pathname.includes(routes.categoryDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.categoryDashboard}>Category List</Link>
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
                      <Link to={routes.notificationDashboard}>Notification List</Link>
                    </li>
                    <li
                      className={
                        location.pathname.includes(routes.WorkingTimeDashboard)
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.WorkingTimeDashboard}>WorkingTime List</Link>
                    </li>
                  </ul>
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
              {isLoggedIn ? (
                <>
                  {isAdmin() && (
                    <li className="nav-item">
                      <Navbar>
                        <NotificationsDropdown />
                      </Navbar>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link
                      className="nav-link header-login"
                      to="#"
                      onClick={logout}
                    >
                      <span>
                        <i className="fa-regular fa-user" />
                      </span>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link header-login" to={routes.login}>
                      <span>
                        <i className="fa-regular fa-user" />
                      </span>
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link header-reg" to={routes.register}>
                      <span>
                        <i className="fa-solid fa-lock" />
                      </span>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default observer(Header);
