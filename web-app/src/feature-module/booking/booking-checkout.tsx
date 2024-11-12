import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Breadcrumbs from "../common/breadcrumbs";
import { Calendar } from "primereact/calendar";
import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const BookingCheckout = () => {
  const routes = all_routes;

  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const onChange = (time: Dayjs, timeString: string | string[]) => {
    console.log(time, timeString);
  };

  const navigate = useNavigate();

  const navigatePath = ()=> {
    navigate(routes.bookingAddon);
  }

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
                    <li className="active">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-01.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Location &amp; Time</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-02.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Add-Ons</h6>
                    </li>
                    <li>
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
                <div className="stickybar">
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
                            <Link to={routes.listingDetails}>View Car Details</Link>
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
                                placeholder="Coupon code"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-secondary apply-coupon-btn d-flex align-items-center ms-2"
                            >
                              Apply
                              <i className="feather icon-arrow-right ms-2" />
                            </button>
                          </div>
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
              </div>
              <div className="col-lg-8">
                <div className="booking-information-main">
                  <form>
                    <div className="booking-information-card">
                      <div className="booking-info-head">
                        <span>
                          <i className="bx bxs-car-garage" />
                        </span>
                        <h5>Rental Type</h5>
                      </div>
                      <div className="booking-info-body">
                        <ul className="booking-radio-btns">
                          <li>
                            <label className="booking_custom_check">
                              <input
                                type="radio"
                                name="rent_type"
                                id="location_delivery"
                                defaultChecked
                              />
                              <span className="booking_checkmark">
                                <span className="checked-title">Delivery</span>
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="booking_custom_check">
                              <input
                                type="radio"
                                name="rent_type"
                                id="location_pickup"
                              />
                              <span className="booking_checkmark">
                                <span className="checked-title">
                                  Self Pickup
                                </span>
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="booking-information-card delivery-location">
                      <div className="booking-info-head">
                        <span>
                          <i className="bx bxs-car-garage" />
                        </span>
                        <h5>Location</h5>
                      </div>
                      <div className="booking-info-body">
                        <div className="form-custom">
                          <label className="form-label">
                            Delivery Location
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control mb-0"
                              placeholder="Add Location"
                            />
                            <Link
                              to="#"
                              className="btn btn-secondary location-btn d-flex align-items-center"
                            >
                              <i className="bx bx-current-location me-2" />
                              Current Location
                            </Link>
                          </div>
                        </div>
                        <div className="input-block m-0">
                          <label className="custom_check d-inline-flex location-check">
                            <span>Return to same location</span>
                            <input type="checkbox" name="remeber" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="form-custom">
                          <label className="form-label">Return Location</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control mb-0"
                              placeholder="Add Location"
                            />
                            <Link
                              to="#"
                              className="btn btn-secondary location-btn d-flex align-items-center"
                            >
                              <i className="bx bx-current-location me-2" />
                              Current Location
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="booking-information-card pickup-location">
                      <div className="booking-info-head">
                        <span>
                          <i className="bx bxs-car-garage" />
                        </span>
                        <h5>Location</h5>
                      </div>
                      <div className="booking-info-body">
                        <div className="form-custom">
                          <label className="form-label">Pickup Location</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control mb-0"
                              defaultValue="Newyork Office - 78, 10th street Laplace USA"
                            />
                          </div>
                        </div>
                        <div className="input-block m-0">
                          <label className="custom_check d-inline-flex location-check">
                            <span>Return to same location</span>
                            <input type="checkbox" name="remeber" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="form-custom">
                          <label className="form-label">Return Location</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control mb-0"
                              defaultValue="Newyork Office - 78, 10th street Laplace USA"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="booking-information-card booking-type-card">
                      <div className="booking-info-head">
                        <span>
                          <i className="bx bxs-location-plus" />
                        </span>
                        <h5>Booking type &amp; Time</h5>
                      </div>
                      <div className="booking-info-body">
                        <ul className="booking-radio-btns">
                          <li>
                            <label className="booking_custom_check">
                              <input type="radio" name="booking_type" />
                              <span className="booking_checkmark">
                                <span className="checked-title">Hourly</span>
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="booking_custom_check">
                              <input
                                type="radio"
                                name="booking_type"
                                defaultChecked
                              />
                              <span className="booking_checkmark">
                                <span className="checked-title">
                                  Day (8 Hrs)
                                </span>
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="booking_custom_check">
                              <input type="radio" name="booking_type" />
                              <span className="booking_checkmark">
                                <span className="checked-title">Weekly</span>
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="booking_custom_check">
                              <input type="radio" name="booking_type" />
                              <span className="booking_checkmark">
                                <span className="checked-title">Monthly</span>
                              </span>
                            </label>
                          </li>
                        </ul>
                        <div className="booking-timings">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-block date-widget">
                                <label className="form-label">Start Date</label>
                                <div className="group-img">
                                  <Calendar
                                    className="datetimepicker bg-custom"
                                    value={date1}
                                    onChange={()=>{}}
                                    placeholder="Choose Date"
                                  />
                                  <span className="input-cal-icon">
                                    <i className="bx bx-calendar" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block time-widge">
                                <label className="form-label">Start Time</label>
                                <div className="group-img style-custom">
                                  <TimePicker
                                    placeholder="Choose Time"
                                    className="form-control timepicker"
                                    onChange={onChange}
                                  />
                                  <span className="input-cal-icon">
                                    <i className="bx bx-time" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block date-widget">
                                <label className="form-label">
                                  Return Date
                                </label>
                                <div className="group-img">
                                  <Calendar
                                    className="datetimepicker bg-custom"
                                    value={date2}
                                    onChange={()=>{}}
                                    placeholder="Choose Date"
                                  />
                                  <span className="input-cal-icon">
                                    <i className="bx bx-calendar" />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block time-widge">
                                <label className="form-label">
                                  Return Time
                                </label>
                                <div className="group-img style-custom">
                                  <TimePicker 
                                    placeholder="Choose Time"
                                    className="form-control timepicker"
                                    onChange={onChange}
                                  />
                                  <span className="input-cal-icon">
                                    <i className="bx bx-time" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="booking-info-btns d-flex justify-content-end">
                      <Link
                        to={routes.listingDetails}
                        className="btn btn-secondary"
                      >
                        Back to Car details
                      </Link>
                      <button onClick={navigatePath}
                        className="btn btn-primary continue-book-btn"
                        type="button"
                      >
                        Continue Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;
