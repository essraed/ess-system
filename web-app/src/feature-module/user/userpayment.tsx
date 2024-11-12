import React, { useEffect, useState } from "react";
import Aos from "aos";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import DashboardMenu from "./common/dashboard-menu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { userPaymentData } from "../../core/data/json/user_payment";

const UserPayment = () => {
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
  const checkbox = () => {
    return (
      <label className="custom_check w-100">
        <input type="checkbox" name="username" />
        <span className="checkmark" />
      </label>
    );
  };
  const status = (res:any) => {
    return (
      <span
        className={`${
          res.status == "Upcoming"
            ? "badge badge-light-secondary"
            : res.status == "Pending"
              ? "badge badge-light-warning"
              : res.status == "Failed"
                ? "badge badge-light-danger"
                : res.status == "Completed"
                  ? "badge badge-light-success"
                  : ""
        }`}
      >
        {res.status}
      </span>
    );
  };
  const action = () => {
    return (
      <div className="dropdown dropdown-action">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-vertical me-1"></i>
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          <Link
            className="dropdown-item"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#view_invoice"
          >
            <i className="feather icon-file-plus me-1"></i> View Invoice
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#delete_modal"
          >
            <i className="feather icon-trash-2 me-1"></i> Delete
          </Link>
        </div>
      </div>
    );
  };
  const [userPayment, setUserPayment] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filteredData = userPayment.filter((booking) => {
    const values = Object.values(booking).map((value:any) =>
      value.toString().toLowerCase()
    );
    return values.some((value) => value.includes(searchInput.toLowerCase()));
  });

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    userPaymentData.getUserPaymentMedium().then((data:any) => setUserPayment(data));
  }, []);
  return (
    <>
      <Breadcrumbs title="User Payment" subtitle="User Payment" />
      <DashboardMenu />
      <div className="content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header">
            <h4>Payments</h4>
          </div>
          {/* /Content Header */}
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sorting-info">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-12">
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
                            <Link className="dropdown-item" to="#">
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
          {/* Payments Table */}
          <div className="row">
            <div className="col-lg-12 d-flex">
              <div className="card book-card flex-fill mb-0">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <h4>
                        All Payments <span>40</span>
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
                      <Column field="bookingID" header="Booking ID"></Column>
                      <Column
                        field="carName"
                        header="Car Name"
                        body={carName}
                      ></Column>
                      <Column field="paidOn" header="Paid on"></Column>
                      <Column field="total" header="Total"></Column>
                      <Column field="mode" header="Mode"></Column>
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
          </div>
          {/* /Payments Table */}
        </div>
      </div>

      <div
        className="modal new-modal fade"
        id="view_invoice"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0 m-0 p-0">
              <div className="invoice-btns">
                <Link to="#" className="btn me-2">
                  <i className="feather icon-printer" /> Print
                </Link>
                <Link to="#" className="btn">
                  <i className="feather icon-download" /> Download Invoice
                </Link>
              </div>
            </div>
            <div className="modal-body">
              <div className="invoice-details">
                <div className="invoice-items">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="invoice-logo">
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info-text">
                        <h4>Invoice</h4>
                        <p>
                          Invoice Number : <span>In983248782</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-item-bills">
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12">
                      <div className="invoice-bill-info">
                        <h6>Billed to</h6>
                        <p>
                          Customer Name <br />
                          9087484288 <br />
                          Address line 1, <br />
                          Address line 2 <br />
                          Zip code ,City - Country
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="invoice-bill-info">
                        <h6>Invoice From</h6>
                        <p>
                          Company Name <br />
                          9087484288 <br />
                          Address line 1, <br />
                          Address line 2 <br />
                          Zip code ,City - Country
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="invoice-bill-info border-0">
                        <p>Issue Date : 27 Jul 2022</p>
                        <p>Due Amount : $1,54,22 </p>
                        <p className="mb-0">PO Number : 54515454</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-table-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="invoice-table table table-center mb-0">
                          <thead>
                            <tr>
                              <th>Rented Car</th>
                              <th>No of days</th>
                              <th>Rental Amount</th>
                              <th className="text-end">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h6>Ferrari 458 MM Speciale</h6>
                              </td>
                              <td>7</td>
                              <td>$2000</td>
                              <td className="text-end">$2000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="payment-details-info">
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="invoice-terms">
                        <h6>Payment Details</h6>
                        <div className="invocie-note">
                          <p>
                            Debit Card
                            <br />
                            XXXXXXXXXXXX-2541
                            <br />
                            HDFC Bank
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="invoice-total-box">
                        <div className="invoice-total-inner">
                          <p>
                            <b>Trip Amount (This does not include fuel)</b>{" "}
                            <span>$2592</span>
                          </p>
                          <p>
                            Trip Protection Fees <span>+ $25</span>
                          </p>
                          <p>
                            Convenience Fees <span>+ $2</span>
                          </p>
                          <p>
                            Refundable Deposit <span>+ $2000</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-total">
                  <h4>
                    Total <span>$4,300.00</span>
                  </h4>
                </div>
                <div className="invoice-note-footer">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                      <div className="invocie-note">
                        <h6>Notes</h6>
                        <p>Enter customer notes or any other details</p>
                      </div>
                      <div className="invocie-note mb-0">
                        <h6>Terms and Conditions</h6>
                        <p>Enter customer notes or any other details</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="invoice-sign">
                        <ImageWithBasePath
                          className="img-fluid d-inline-block"
                          src="assets/img/signature.png"
                          alt="Sign"
                        />
                        <span className="d-block">dreamsrent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /View Invoice Modal */}
      {/* Delete Modal */}
      <div
        className="modal new-modal fade"
        id="delete_modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="delete-action">
                <div className="delete-header">
                  <h4>Delete Payment History</h4>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn">
                  <div className="row">
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-secondary w-100"
                      >
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary w-100"
                      >
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
    </>
  );
};

export default UserPayment;
