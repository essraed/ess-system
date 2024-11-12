import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ActivityList from "./AuthorityList";

const AuthorityDashboard = () => {
  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        <Breadcrumbs title="Authorities" subtitle="Listings" />
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <ActivityList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorityDashboard;
