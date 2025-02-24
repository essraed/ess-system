import React from "react";
import { Link, useLocation } from "react-router-dom";

import { all_routes } from "../router/all_routes";
import { breadcrumbs } from "../../core/data/interface/interface";

const Breadcrumbs = (props: breadcrumbs) => {
  const routes = all_routes;
  const location = useLocation();
  let addButton = null;
  if (
    location.pathname.startsWith(routes.letterDetails.slice(0, -3)) ||
    location.pathname.startsWith(routes.letterEdit.slice(0, -3)) ||
    location.pathname === routes.letterDashboard ||
    location.pathname === routes.authorityDashboard ||
    location.pathname === routes.categoryDashboard ||
    location.pathname.startsWith(routes.categoryDetails.slice(0, -3)) ||
    location.pathname === routes.serviceDashboard ||
    location.pathname.startsWith(routes.ServiceDetails.slice(0, -3)) ||
    location.pathname.startsWith(routes.bookingDetails.slice(0, -3)) ||
    location.pathname.startsWith(routes.serviceList.slice(0, -3)) ||
    location.pathname === routes.bookingDashboard ||
    location.pathname === routes.notificationDashboard ||
    location.pathname === routes.WorkingTimeDashboard ||
    location.pathname === routes.carDashboard ||
    location.pathname === routes.blogDashboard ||
    location.pathname === routes.contactDashboard ||
    location.pathname === routes.contactUs ||
    location.pathname === routes.Losts || 
    location.pathname === routes.lostDashboard || 
    location.pathname === routes.allServices ||
    location.pathname===routes.businessSetup||
    location.pathname===routes.Complaints||
    location.pathname===routes.ComplaintDashboard||
    location.pathname===routes.UserDashboard||
    location.pathname.startsWith(routes.contactDetails.slice(0, -3)) 
  ) {
    addButton = (
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">{props.title}</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={routes.homeOne}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">{props.subtitle}</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {props.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    addButton = (
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title"></h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin-dashboard">{props.title}</Link>
            </li>
            <li className="breadcrumb-item active">{props.subtitle}</li>
          </ul>
        </div>
        <div className="col-auto float-end ms-auto"></div>
      </div>
    );
  }
  return <>{addButton}</>;
};

export default Breadcrumbs;
