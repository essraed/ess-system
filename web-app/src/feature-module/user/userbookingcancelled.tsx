import React, { useEffect, useState } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import DashboardMenu from "./common/dashboard-menu";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userBookingCancelledData } from "../../core/data/json/user_booking_cancelled";
import { all_routes } from "../router/all_routes";

const UserBookingCancelled = () => {
  const routes = all_routes;
  const [userBookingCancelled, setUserBookingCancelled] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filteredData = userBookingCancelled.filter((booking) => {
    const values = Object.values(booking).map((value:any) =>
      value.toString().toLowerCase()
    );
    return values.some((value) => value.includes(searchInput.toLowerCase()));
  });
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    userBookingCancelledData
      .getUserBookingCancelledMedium()
      .then((data:any) => setUserBookingCancelled(data));
  }, []);

  const carName = (res:any) => {
    return (
      <div className="table-avatar">
        <Link to="#" className="avatar avatar-lg flex-shrink-0">
          <ImageWithBasePath
            className="avatar-img"
            src={res.img}
            alt="Booking"
          />
        </Link>
        <div className="table-head-name flex-grow-1">
          <Link to="#">{res.carName}</Link>
          <p>{res.deliveryStatus}</p>
        </div>
      </div>
    );
  };
  const delivery = (res:any) => {
    return (
      <p>
        {res.pickupDeliveryLocation1}
        <span className="d-block">{res.pickupDeliveryLocation2}</span>
      </p>
    );
  };
  const location = (res:any) => {
    return (
      <p>
        {res.dropoffLocation1}
        <span className="d-block">{res.dropoffLocation2}</span>
      </p>
    );
  };
  const checkbox = () => {
    return (
      <label className="custom_check w-100">
        <input type="checkbox" name="username" />
        <span className="checkmark" />
      </label>
    );
  };
  const status = (res:any) => {
    return <span className="badge badge-light-danger">{res.status}</span>;
  };
  const action = () => {
    return (
      <div className="dropdown dropdown-action">
      <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fas fa-ellipsis-vertical" />
      </Link>
      <div className="dropdown-menu dropdown-menu-end">
        <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#cancelled_booking">
          <i className="feather icon-eye" /> View
        </Link>
        <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
          <i className="feather icon-trash-2" /> Delete
        </Link>
      </div>
    </div>
    );
  };
  const BookingId = (res:any) => {
    return (
      <Link to="#" data-bs-toggle="modal" data-bs-target="#cancelled_booking" className="bookbyid">

        {res.bookingId}
      </Link>
      
    );
  };

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);
  return (
    <>
      <Breadcrumbs title="User Bookings" subtitle="User Bookings" />
      <DashboardMenu />
      <div className="content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header">
            <h4>My Bookings</h4>
          </div>
          {/* /Content Header */}
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sorting-info">
                <div className="row d-flex align-items-center">
                  <div className="col-xl-7 col-lg-8 col-sm-12 col-12">
                    <div className="booking-lists">
                      <ul className="nav">
                        <li>
                          <Link to={routes.userBookings}>All Bookings</Link>
                        </li>
                        <li>
                          <Link to={routes.userBookingUpcoming}>Upcoming</Link>
                        </li>
                        <li>
                          <Link to={routes.userBookingInprogress}>
                            Inprogress
                          </Link>
                        </li>
                        <li>
                          <Link to={routes.userBookingComplete}>Completed</Link>
                        </li>
                        <li>
                          <Link
                            className="active"
                            to={routes.userBookingCancelled}
                          >
                            Cancelled
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-sm-12 col-12">
                    <div className="filter-group">
                      <div className="sort-week sort">
                        <div className="dropdown dropdown-action">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            This Week <i className="fas fa-chevron-down" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="#">
                              This Week
                            </Link>
                            <Link className="dropdown-item" to="#">
                              This Month
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Last 30 Days
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#custom_date"
                            >
                              Custom
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="sort-relevance sort">
                        <div className="dropdown dropdown-action">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Sort By Relevance{" "}
                            <i className="fas fa-chevron-down" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to="#">
                              Sort By Relevance
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Ascending
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Descending
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Sort By Alphabet
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="row">
            {/* Cancelled */}
            <div className="col-lg-12 d-flex">
              <div className="card book-card flex-fill mb-0">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <h4>
                        Cancelled <span>40</span>
                      </h4>
                    </div>
                    <div className="col-md-7 text-md-end">
                      <div className="table-search">
                      <div id="tablefilter">
                          <label>
                            <input
                              type="text"
                              value={searchInput}
                              onChange={(e) => setSearchInput(e.target.value)}
                              placeholder="Search"
                              className="inputsearch"
                            />
                          </label>
                        </div>
                        <Link to={routes.listingGrid} className="btn btn-add">
                          <i className="feather icon-plus-circle" />
                          Add Booking
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive dashboard-table">
                    <DataTable
                      className="table datatable"
                      value={filteredData}
                      paginator
                      rows={10}
                      rowsPerPageOptions={[10, 25, 50]}
                      currentPageReportTemplate="{first}"
                    >
                      <Column body={checkbox} header={checkbox}></Column>
                      <Column field="bookingId" header="Booking ID" body={BookingId}></Column>
                      <Column
                        field="carName"
                        header="Car Name"
                        body={carName}
                      ></Column>
                      <Column field="rentalType" header="Rental Type"></Column>
                      <Column
                        field="deliveryStatus"
                        header="Pickup / Delivery Location"
                        body={delivery}
                      ></Column>
                      <Column
                        field="location"
                        header="Dropoff Location"
                        body={location}
                      ></Column>
                      <Column field="bookedOn" header="Booked On"></Column>
                      <Column field="total" header="Total"></Column>
                      <Column
                        field="status"
                        header="Status"
                        body={status}
                      ></Column>
                      <Column
                        field="action"
                        header="Action"
                        body={action}
                      ></Column>
                    </DataTable>
                  </div>
                  <div className="table-footer">
                    <div className="row">
                      <div className="col-md-6">
                        <div id="tablelength" />
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div id="tablepage" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Cancelled */}
          </div>
        </div>
      </div>
      <div className="modal new-modal multi-step fade" id="cancelled_booking" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close-btn" data-bs-dismiss="modal"><span>×</span></button>
              </div>
              <div className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath src="assets/img/cars/car-05.jpg" alt="img" />
                    </div>
                    <div className="book-info">
                      <h6>Chevrolet Camaro</h6>
                      <p><i className="feather icon-map-pin" /> Location : Miami St, Destin, FL 32550, USA</p>
                    </div>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6>$4700 <Link to="#"><i className="feather icon-alert-circle" /></Link></h6>
                  </div>
                </div>
                <div className="booking-group">
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Booking Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Booking Type</h6>
                          <p>Delivery</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Rental Type</h6>
                          <p>Days (3 Days)</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Extra Service</h6>
                          <p>Mobile Charging</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Delivery</h6>
                          <p>45, Avenue ,Mark Street, USA</p>
                          <p>11 Jan 2023, 03:30 PM</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Dropoff</h6>
                          <p>78, 10th street Laplace,USA</p>
                          <p>11 Jan 2023, 03:30 PM</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Status</h6>
                          <span className="badge badge-light-danger">Refund Initiated</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Booked On</h6>
                          <p>15 Sep 2023, 09:30 AM</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Start Date</h6>
                          <p>18 Sep 2023, 09:30 AM</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>End Date</h6>
                          <p>20 Sep 2023, 09:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-wrapper">
                    <div className="booking-title">
                      <h6>Personal Details</h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Details</h6>
                          <p>Johna Melinda</p>
                          <p>+1 56441 56464</p>
                          <p>Johna@example.com</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>Address</h6>
                          <p>78, 10th street</p>
                          <p>Laplace,USA</p>
                          <p>316 654</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">								
                        <div className="booking-view">
                          <h6>No of Person’s</h6>
                          <p>2 Adults, 1 Child</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cancel-reason">
                    <h6>Cancel Reason</h6>
                    <p>On the booking date i have other work on my personal so i am cancelling my bookingOn the booking date i have other work on my personal so i am cancelling my booking On the booking date i have other work on my personal  so i am cancelling my booking</p>
                  </div>
                  <div className="cancel-box">
                    <p>Cancelled By User on 17 Sep 2023, Refund will deposited in user account on 19 Sep 2023 </p>
                  </div>
                </div>
                <div className="modal-btn modal-btn-sm text-end">
                  <Link to="#" data-bs-target="#view_status" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn btn-primary">
                    View status
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Cancelled Booking */}
        {/* View Status */}
        <div className="modal new-modal fade" id="view_status" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="booking-header">
                  <div className="booking-img-wrap">
                    <div className="book-img">
                      <ImageWithBasePath src="assets/img/cars/car-05.jpg" alt="img" />
                    </div>
                    <div className="book-info">
                      <h6>Chevrolet Camaro</h6>
                      <p><i className="feather icon-map-pin" /> Location : Miami St, Destin, FL 32550, USA</p>
                    </div>
                  </div>
                  <div className="book-amount">
                    <p>Total Amount</p>
                    <h6>$4700 <Link to="#"><i className="feather icon-alert-circle" /></Link></h6>
                  </div>
                </div>
                <div className="refund-wrap booking-group">
                  <div className="booking-wrapper">
                    <h6>Refund Method</h6>
                    <div className="card-status-wrap">
                      <div className="card-status">
                        <h5>Mastercard</h5>
                        <p>Started on : 20 Oct 2023</p>
                      </div>
                      <div className="status-img">
                        <ImageWithBasePath src="assets/img/icons/card-icon.svg" alt="" />
                      </div>
                    </div>
                    <div className="refund-process">
                      <h5>Refund Process</h5>
                      <ul>
                        <li>
                          <h6>Dreams Rent initiated your refund</h6>
                          <p>20 Oct 2023</p>
                        </li>
                        <li>
                          <h6>Mastercard has accepted your request</h6>
                          <p>20 Oct 2023</p>
                        </li>
                        <li>
                          <h6>Refund credited to you account successfully</h6>
                          <p>20 Oct 2023</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /View Status */}
        {/* Delete Modal */}
        <div className="modal new-modal fade" id="delete_modal" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="delete-action">
                  <div className="delete-header">
                    <h4>Delete Booking</h4>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn">
                    <div className="row">
                      <div className="col-6">
                        <Link to="#" data-bs-dismiss="modal" className="btn btn-secondary w-100">
                          Delete
                        </Link>
                      </div>
                      <div className="col-6">
                        <Link to="#" data-bs-dismiss="modal" className="btn btn-primary w-100">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Modal */}
        {/* Custom Date Modal */}
        <div className="modal new-modal fade" id="custom_date" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Custom Date</h4>
                <button type="button" className="close-btn" data-bs-dismiss="modal"><span>×</span></button>
              </div>
              <div className="modal-body">
                <form action="#">
                  <div className="modal-form-group">
                    <label>From Date <span className="text-danger">*</span></label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="modal-form-group">
                    <label>To Date <span className="text-danger">*</span></label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="modal-btn modal-btn-sm text-end">
                    <Link to="#" data-bs-dismiss="modal" className="btn btn-secondary">
                      Cancel Booking
                    </Link>
                    <Link to="#" data-bs-dismiss="modal" className="btn btn-primary">
                      Start Ride
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default UserBookingCancelled;
