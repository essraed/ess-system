
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

  const [mobileSubmenu, setMobileSubmenu] = useState(false);

  const mobileSubmenus = () => {
    setMobileSubmenu(!mobileSubmenu);
  };


  const [locationPathname, setLocationPathname] = useState(location.pathname);

  const {
    userStore: { isAdmin, logout, isLoggedIn },
    categoryStore: { categories, loadCategories }
  } = useStore();

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const { t } = useTranslation();

 


  return (
    <>
      <header className="header">
        <div className="custom-container">
          <div className="row">
            <div className="col-md-6 col-6">
              <Link to={routes.homeOne} className="navbar-brand logo">
                <ImageWithBasePath
                  lazyLoad={true}
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
                <li className="contact-number nav-item pe-4">
                  <a className="flex items-center font-semibold" href="https://api.whatsapp.com/send?phone=97143426666" target="_blank" rel="noreferrer">
                    <i className="fab fa-whatsapp pe-2"></i>
                    <div className="addr-info">{COMPANY_PHONE_NUMBER}</div>
                  </a>
                </li>
                <li>|</li>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link className="nav-link header-login" to="#" onClick={logout}>
                      <span className="mx-1">
                        <i className="fa-regular fa-user" />
                      </span>
                      {t("Logout")}
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link header-login" to={routes.login}>
                      <span>
                        <i className="fa-regular fa-user" />
                      </span>
                      {t("Sign In")}
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
              <Link id="mobile_btn" to="#" onClick={handleClick}>
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
                  {/* handleClick */}
                  {" "}
                  <i className="fas fa-times" />
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
                  <Link to="#" onClick={mobileSubmenus}>
                    {t("Booking Services")} <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className={`submenu ${mobileSubmenu ? 'd-block' : 'd-none'}`}>
                    {categories?.map((item, index) => (
                      <li
                        key={index}
                        className={
                          locationPathname === `/services/${item.id}`
                            ? "active"
                            : ""
                        }
                      >
                        <Link to={`/services/${item.id}`} onClick={() => setLocationPathname(`/services/${item.id}`)}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {isAdmin() && <li
                  className={`has-submenu ${location.pathname.includes("listing") ? "active" : ""}`}
                >
                  <Link to="#" onClick={mobileSubmenus}>
                    {t("Dashboards")} <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className={`submenu ${mobileSubmenu ? 'd-block' : 'd-none'}`}>

                    <li
                      className={
                        locationPathname===routes.letterDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.letterDashboard} onClick={() => setLocationPathname(routes.letterDashboard)}>{t("Letter List")}</Link>
                    </li>
                    <li
                      className={
                        locationPathname===routes.serviceDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.serviceDashboard} onClick={() => setLocationPathname(routes.serviceDashboard)}>{t("Service List")}</Link>
                    </li>
                    <li
                      className={
                        locationPathname===routes.categoryDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.categoryDashboard} onClick={() => setLocationPathname(routes.categoryDashboard)}>{t("Category List")}</Link>
                    </li>

                    <li
                      className={
                        locationPathname===routes.authorityDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.authorityDashboard} onClick={() => setLocationPathname(routes.authorityDashboard)}>{t("Authority List")}</Link>
                    </li>

                    <li
                      className={
                        locationPathname===routes.carDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.carDashboard} onClick={() => setLocationPathname(routes.carDashboard)}>{t("Car List")}</Link>
                    </li>
                    <li
                      className={
                        locationPathname===routes.notificationDashboard

                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.notificationDashboard} onClick={() => setLocationPathname(routes.notificationDashboard)}>
                        {t("Notification List")}
                      </Link>
                    </li>
                    <li
                      className={
                        locationPathname===routes.bookingDashboard

                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.bookingDashboard} onClick={() => setLocationPathname(routes.bookingDashboard)}>{t("Booking List")}</Link>
                    </li>
                    <li
                      className={
                        locationPathname===routes.WorkingTimeDashboard
                          ? "active"
                          : ""
                      }
                    >
                      <Link to={routes.WorkingTimeDashboard} onClick={() => setLocationPathname(routes.WorkingTimeDashboard)}>
                        {t("WorkingTime List")}
                      </Link>
                    </li>
                  </ul>
                </li>}

                <li
                  className={
                    location.pathname.includes(routes.contactUs) ? "active" : ""
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
        </nav>
      </header>
    </>
  );
};

export default observer(Header);
