import React, { useEffect } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import DashboardMenu from "./common/dashboard-menu";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const UserBookingInprogress = () => {
  const routes= all_routes;
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);
  return (
    <>
      <Breadcrumbs title="User Payment" subtitle="User Payment" />
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
                  <li><Link to={routes.userbookings}>All Bookings</Link></li>
                  <li><Link to={routes.userbookingupcoming}>Upcoming</Link></li>
                  <li><Link className="active"  to={routes.userbookinginprogress}>Inprogress</Link></li>
                  <li><Link to={routes.userbookingcomplete}>Completed</Link></li>
                  <li><Link to={routes.userBookingCancelled}>Cancelled</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-4 col-sm-12 col-12">
              <div className="filter-group">
                <div className="sort-week sort">
                  <div className="dropdown dropdown-action">
                    <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
                      <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#custom_date">
                        Custom
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sort-relevance sort">
                  <div className="dropdown dropdown-action">
                    <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Sort By Relevance <i className="fas fa-chevron-down" />
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
      {/* Inprogress */}
      <div className="col-lg-12 d-flex">
        <div className="card book-card flex-fill mb-0">
          <div className="card-header">	
            <div className="row align-items-center">
              <div className="col-md-5">
                <h4>Inprogress <span>40</span></h4>	
              </div>
              <div className="col-md-7 text-md-end">
                <div className="table-search">
                  <div id="tablefilter" />										
                  <Link to={routes.listingGrid} className="btn btn-add"><i className="feather icon-plus-circle" />Add Booking</Link>	
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">	
            <div className="table-responsive dashboard-table">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <label className="custom_check w-100">
                        <input type="checkbox" name="username" />
                        <span className="checkmark" /> 
                      </label>
                    </th>
                    <th>Booking ID</th>
                    <th>Car Name</th>
                    <th>Rental Type</th>
                    <th>Pickup / Delivery Location</th>
                    <th>Dropoff Location</th>
                    <th>Booked On</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="custom_check w-100">
                        <input type="checkbox" name="username" />
                        <span className="checkmark" /> 
                      </label>
                    </td>
                    <td>#1002</td>
                    <td>
                      <div className="table-avatar">
                        <Link to="#" className="avatar avatar-lg flex-shrink-0">
                          <ImageWithBasePath className="avatar-img" src="assets/img/cars/car-01.jpg" alt="Booking" />
                        </Link>
                        <div className="table-head-name flex-grow-1">
                          <Link to="#">Toyota Camry SE 350</Link>
                          <p>Self Pickup</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>Day</p>
                    </td>
                    <td>
                      <p>1646 West St, Grand Rapids <span className="d-block">18 Sep 2023, 09:00 AM</span></p>
                    </td>
                    <td>
                      <p>26 Platinum Drive, Canonsburg<span className="d-block">15 Sep 2023, 11:30 AM</span></p>
                    </td>
                    <td>
                      <p>18 Sep 2023, 08:10 PM</p>
                    </td>
                    <td>
                      <p className="text-darker">$500</p>
                    </td>
                    <td>
                      <span className="badge badge-light-warning">Inprogress</span>
                    </td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fas fa-ellipsis-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#inprogress_booking">
                            <i className="feather icon-eye" /> View
                          </Link>
                          <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
                            <i className="feather icon-trash-2" /> Delete
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>										
                  <tr>
                    <td>
                      <label className="custom_check w-100">
                        <input type="checkbox" name="username" />
                        <span className="checkmark" /> 
                      </label>
                    </td>
                    <td>#1004</td>
                    <td>
                      <div className="table-avatar">
                        <Link to="#" className="avatar avatar-lg flex-shrink-0">
                          <ImageWithBasePath className="avatar-img" src="assets/img/cars/car-03.jpg" alt="Booking" />
                        </Link>
                        <div className="table-head-name flex-grow-1">
                          <Link to="#">Audi A3 2019 new</Link>
                          <p>Self Pickup</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>Monthly</p>
                    </td>
                    <td>
                      <p>63 White Pine Lane, Martinsville <span className="d-block">05 Nov 2023, 02:30 PM</span></p>
                    </td>
                    <td>
                      <p>14 Roane Avenue, Herndon <span className="d-block">05 Dec 2023, 02:30 PM</span></p>
                    </td>
                    <td>
                      <p>04 Oct 2023, 08:00 AM</p>
                    </td>
                    <td>
                      <p className="text-darker">$1500</p>
                    </td>
                    <td>
                      <span className="badge badge-light-warning">Inprogress</span>
                    </td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fas fa-ellipsis-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#inprogress_booking">
                            <i className="feather icon-eye" /> View
                          </Link>
                          <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
                            <i className="feather icon-trash-2" /> Delete
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      {/* /Inprogress */}
    </div>			
    {/* /Dashboard */}						
  </div>			
</div>

<div>
  {/* Inprogress Booking */}
  <div className="modal new-modal multi-step fade" id="inprogress_booking" data-keyboard="false" data-backdrop="static">
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
                    <span className="badge badge-light-warning">Inprogress</span>
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
          </div>
          <div className="modal-btn modal-btn-sm text-end">
            <Link to="#" data-bs-target="#start_ride" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn btn-primary">
              Complete Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Inprogress Booking */}
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
  {/* /Custom Date Modal */}
</div>


    </>
  );
};

export default UserBookingInprogress;
