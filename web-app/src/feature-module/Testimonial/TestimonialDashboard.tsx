
import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import TestimonialList from "./TestimonialList";

const TestimonialDashboard = () => {
  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        {/* <Breadcrumbs title="Testimonials" subtitle="Listings" /> */}
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <TestimonialList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialDashboard;
