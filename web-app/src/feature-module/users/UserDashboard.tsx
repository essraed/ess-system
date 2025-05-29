
import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import UserList from "./UserList";

const UserDashboard = () => {
  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        {/* <Breadcrumbs title="Users" subtitle="Listings" /> */}
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <UserList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
