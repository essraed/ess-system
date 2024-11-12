import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import SettingsSidebar from "./settingssidebar";
import Aos from "aos";
import { all_routes } from "../../router/all_routes";
import DashboardMenu from "../common/dashboard-menu";

const UserSettings = () => {
  const routes = all_routes
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);
  return (
    <div>
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">User Settings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={routes.homeOne}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Settings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Dashboard Menu */}
      <DashboardMenu />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header content-settings-header">
            <h4>Settings</h4>
          </div>
          {/* /Content Header */}
          <div className="row">
            {/* Settings Menu */}
            <SettingsSidebar />
            {/* /Settings Menu */}
            {/* Settings Details */}
            <div className="col-lg-9">
              <div className="settings-info">
                <div className="settings-sub-heading">
                  <h4>Profile</h4>
                </div>
                <form action="#">
                  {/* Basic Info */}
                  <div className="profile-info-grid">
                    <div className="profile-info-header">
                      <h5>Basic Information</h5>
                      <p>Information about user</p>
                    </div>
                    <div className="profile-inner">
                      <div className="profile-info-pic">
                        <div className="profile-info-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-15.jpg"
                            alt="Profile"
                          />
                          <div className="profile-edit-info">
                            <Link to="#">
                              <i className="feather icon-edit me-1" />
                            </Link>
                            <Link to="#">
                              <i className="feather icon-trash-2" />
                            </Link>
                          </div>
                        </div>
                        <div className="profile-info-content">
                          <h6>Profile picture</h6>
                          <p>PNG, JPEG under 15 MB</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="profile-form-group">
                            <label>
                              User Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter User Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="+ 1 65656565656"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Basic Info */}
                  {/* Address Info */}
                  <div className="profile-info-grid">
                    <div className="profile-info-header">
                      <h5>Address Information</h5>
                      <p>Information about address of user</p>
                    </div>
                    <div className="profile-inner">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-form-group">
                            <label>
                              Address <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Address"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              Country <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Country"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              State <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter State"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              City <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter City"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="profile-form-group">
                            <label>
                              Pincode <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Pincode"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Address Info */}
                  {/* Profile Submit */}
                  <div className="profile-submit-btn">
                    <Link to="#" className="btn btn-secondary">
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-primary">
                      Save Changes
                    </Link>
                  </div>
                  {/* /Profile Submit */}
                </form>
              </div>
            </div>
            {/* /Settings Details */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default UserSettings;
