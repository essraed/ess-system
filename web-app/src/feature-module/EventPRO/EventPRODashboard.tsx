
import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import EventList from "./EventPROList";
import EventPROList from "./EventPROList";

const EventPRODashboard = () => {
  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        <Breadcrumbs title="Events" subtitle="Listings" />
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <EventPROList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventPRODashboard;
