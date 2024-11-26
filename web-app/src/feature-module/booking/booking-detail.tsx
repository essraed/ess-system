import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Breadcrumbs from "../common/breadcrumbs";
import { Dropdown } from "primereact/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const BookingDetail = () => {
  const routes = all_routes;

  const [selectedPersons, setSelectedPersons] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const persons = [
    { name: "2 Adults, 1 Child" },
    { name: "5 Adults, 2 Child" },
  ];
  const country = [{ name: "USA" }, { name: "UK" }];
  const navigate = useNavigate();

  const navigatePath = () => {
    navigate(routes.bookingPayment);
  };

  return (
    <div>
      <Breadcrumbs title="Checkout" subtitle="Checkout" />
      <div className="booking-new-module">
        <div className="container">
          <div className="booking-wizard-head">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-3">
                <div className="booking-head-title">
                  <h4>Reserve Your Car</h4>
                  <p>Complete the following steps</p>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9">
                <div className="booking-wizard-lists">
                  <ul>
                    <li className="active activated">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-01.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Location &amp; Time</h6>
                    </li>
                    <li className="active activated">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-02.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Add-Ons</h6>
                    </li>
                    <li className="active">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-03.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Detail</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-04.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Checkout</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-05.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Booking Confirmed</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-detail-info">
            <div className="row">
              <div className="col-lg-4 theiaStickySidebar">
                <div className="booking-sidebar">
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head">
                      <h5>Car Details</h5>
                    </div>
                    <div className="booking-sidebar-body">
                      <div className="booking-car-detail">
                        <span className="car-img">
                          <ImageWithBasePath
                            src="assets/img/car-list-4.jpg"
                            className="img-fluid"
                            alt="Car"
                          />
                        </span>
                        <div className="care-more-info">
                          <h5>Chevrolet Camaro</h5>
                          <p>Miami St, Destin, FL 32550, USA</p>
                          <Link to={routes.listingDetails}>
                            View Car Details
                          </Link>
                        </div>
                      </div>
                      <div className="booking-vehicle-rates">
                        <ul>
                          <li>
                            <div className="rental-charge">
                              <h6>
                                Rental Charges Rate <span> (1 day )</span>
                              </h6>
                              <span className="text-danger">
                                (This does not include fuel)
                              </span>
                            </div>
                            <h5>+ $300</h5>
                          </li>
                          <li>
                            <h6>Door delivery &amp; Pickup</h6>
                            <h5>+ $60</h5>
                          </li>
                          <li>
                            <h6>Trip Protection Fees</h6>
                            <h5>+ $25</h5>
                          </li>
                          <li>
                            <h6>Convenience Fees</h6>
                            <h5>+ $2</h5>
                          </li>
                          <li>
                            <h6>Tax</h6>
                            <h5>+ $2</h5>
                          </li>
                          <li>
                            <h6>Refundable Deposit</h6>
                            <h5>+$1200</h5>
                          </li>
                          <li className="total-rate">
                            <h6>Subtotal</h6>
                            <h5>+$1604</h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Location &amp; Time</h5>
                      <Link
                        to={routes.bookingCheckout}
                        className="d-flex align-items-center"
                      >
                        <i className="bx bx-edit-alt me-2" />
                        Edit
                      </Link>
                    </div>
                    <div className="booking-sidebar-body">
                      <ul className="location-address-info">
                        <li>
                          <h6>Booking Type</h6>
                          <p>Delivery</p>
                        </li>
                        <li>
                          <h6>Rental Type</h6>
                          <p>Days</p>
                        </li>
                        <li>
                          <h6>Delivery Location &amp; time</h6>
                          <p>1230 E Springs Rd, Los Angeles, CA, USA</p>
                          <p>04/18/2024 - 14:00</p>
                        </li>
                        <li>
                          <h6>Booking Type</h6>
                          <p>
                            Norwegian Caribbean Cruise Los Angeles, CA 90025
                          </p>
                          <p>04/27/2024 - 03:00</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Add-ons</h5>
                      <Link
                        to={routes.bookingAddon}
                        className="d-flex align-items-center"
                      >
                        <i className="bx bx-edit-alt me-2" />
                        Edit
                      </Link>
                    </div>
                    <div className="booking-sidebar-body">
                      <div className="booking-vehicle-rates">
                        <ul className="mt-0">
                          <li>
                            <h6>GPS Navigation Systems</h6>
                            <h5> $25</h5>
                          </li>
                          <li>
                            <h6>Trip Protection Fees</h6>
                            <h5> $25</h5>
                          </li>
                          <li>
                            <h6>Convenience Fees</h6>
                            <h5> $50</h5>
                          </li>
                          <li className="total-rate">
                            <h6>Add-ons Charges Rate</h6>
                            <h5>$1200</h5>
                          </li>
                        </ul>
                      </div>
                      <div className="book-our-drivers">
                        <h4 className="title-head">Driver</h4>
                        <ul className="acting-driver-list">
                          <li className="d-block">
                            <div className="driver-profile-info">
                              <span className="driver-profile">
                                <ImageWithBasePath
                                  src="assets/img/drivers/driver-02.jpg"
                                  alt="Img"
                                />
                              </span>
                              <div className="driver-name">
                                <h5>Ruban</h5>
                                <ul>
                                  <li>No of Rides Completed : 32</li>
                                  <li>Age : 36</li>
                                </ul>
                              </div>
                            </div>
                            <div className="change-driver">
                              <Link
                                to="#"
                                className="btn btn-secondary d-inline-flex align-items-center"
                              >
                                <i className="bx bx-check-circle me-2" />
                                Change Driver
                              </Link>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Coupon</h5>
                      <Link to="#" className="coupon-view">
                        View Coupons
                      </Link>
                    </div>
                    <div className="booking-sidebar-body">
                      <form>
                        <div className="d-flex align-items-center">
                          <div className="form-custom flex-fill">
                            <input
                              type="text"
                              className="form-control mb-0"
                              defaultValue="FIRSTBOOKING"
                            />
                            <Link to="#" className="coupon-close">
                              <span>
                                <i className="bx bx-x" />
                              </span>
                            </Link>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-secondary d-flex align-items-center apply-coupon-btn disabled ms-2"
                          >
                            Apply
                            <i className="feather icon-arrow-right ms-2" />
                          </button>
                        </div>
                        <span className="coupen-applied-offter">
                          <i className="bx bxs-offer" />
                          Saved in this Booking{" "}
                        </span>
                      </form>
                    </div>
                  </div>
                  <div className="total-rate-card">
                    <div className="vehicle-total-price">
                      <h5>Estimated Total</h5>
                      <span>$3541</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="booking-information-main">
                  <form>
                    <div className="booking-information-card">
                      <div className="booking-info-head justify-content-between">
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="bx bx-add-to-queue" />
                          </span>
                          <h5>Billing Info</h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <h6>Returning customer?</h6>
                          <Link
                            to="#"
                            className="btn btn-secondary ms-3"
                            data-bs-toggle="modal"
                            data-bs-target="#sign_in_modal"
                          >
                            <i className="bx bx-user me-2" />
                            Sign In
                          </Link>
                        </div>
                      </div>
                      <div className="booking-info-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">
                                First Name{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">
                                Last Name{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">
                                No of Persons{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <Dropdown
                                value={selectedPersons}
                                onChange={(e) => setSelectedPersons(e.value)}
                                options={persons}
                                optionLabel="name"
                                placeholder="2 Adults, 1 Child"
                                className="w-100"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">Company</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Company Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block">
                              <label className="form-label">
                                Street Address{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-block">
                              <label className="form-label">
                                Country <span className="text-danger"> *</span>
                              </label>
                              <Dropdown
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.value)}
                                options={country}
                                optionLabel="name"
                                placeholder="Country"
                                className="w-100"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-block">
                              <label className="form-label">
                                Enter City{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-block">
                              <label className="form-label">
                                Pincode <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Pincode"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">
                                Email Address{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">
                                Phone Number{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Phone Number"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block">
                              <label className="form-label">
                                Additional Information
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Additional Information"
                                rows={5}
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block">
                              <label className="form-label">
                                Driving Licence Number{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Driving Licence Number"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block">
                              <label className="form-label">
                                Upload Document{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <div className="profile-uploader">
                                <span className="drag-upload-btn">
                                  <span className="upload-btn">
                                    <i className="bx bx-upload me-2" />
                                    Upload Photo
                                  </span>
                                  or Drag Photo
                                </span>
                                <input type="file" multiple id="image_sign" />
                                <div id="frames" />
                              </div>
                              <p className="img-size-info">
                                The maximum photo size is 4MB. Formats: jpeg,
                                jpg, png.{" "}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block m-0">
                              <label className="custom_check d-inline-flex location-check m-0">
                                <span>
                                  I have Read and Accept Terms &amp; Conditions
                                </span>{" "}
                                <span className="text-danger"> *</span>
                                <input type="checkbox" name="remeber" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="booking-info-btns d-flex justify-content-end">
                      <Link
                        to={routes.bookingAddon}
                        className="btn btn-secondary"
                      >
                        Back to Add-ons
                      </Link>
                      <button
                        onClick={navigatePath}
                        className="btn btn-primary continue-book-btn"
                        type="submit"
                      >
                        Confirm &amp; Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal new-modal multi-step fade"
        id="sign_in_modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="login-auth">
                    <div className="login-auth-wrap">
                      <h1>Sign In</h1>
                      <p className="account-subtitle">
                        We&apos;ll send a confirmation code to your email.
                      </p>
                      <form>
                        <div className="input-block">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="input-block">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="pass-group">
                            <input
                              type="password"
                              className="form-control pass-input"
                              placeholder="............."
                            />
                            <span className="fas fa-eye-slash toggle-password" />
                          </div>
                        </div>
                        <div className="input-block text-end">
                          <Link
                            className="forgot-link"
                            to={routes.forgotPassword}
                          >
                            Forgot Password ?
                          </Link>
                        </div>
                        <div className="input-block m-0">
                          <label className="custom_check d-inline-flex">
                            <span>Remember me</span>
                            <input type="checkbox" name="remeber" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <Link
                          to={routes.homeOne}
                          className="btn btn-outline-light w-100 btn-size mt-1"
                        >
                          Sign In
                        </Link>
                        <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or-log">
                            Or, log in with your email
                          </span>
                        </div>
                        {/* Social Login */}
                        <div className="social-login">
                          <Link
                            to="#"
                            className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/google.svg"
                                className="img-fluid"
                                alt="Google"
                              />
                            </span>
                            Log in with Google
                          </Link>
                        </div>
                        <div className="social-login">
                          <Link
                            to="#"
                            className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/facebook.svg"
                                className="img-fluid"
                                alt="Facebook"
                              />
                            </span>
                            Log in with Facebook
                          </Link>
                        </div>
                        {/* /Social Login */}
                        <div className="text-center dont-have">
                          Don&apos;t have an account ?{" "}
                          <Link to={routes.register}>Sign Up</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
