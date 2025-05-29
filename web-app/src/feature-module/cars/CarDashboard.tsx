
import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import CarList from "./CarList";

const CarDashboard = () => {
  return (
    <>
      {/* // table filters */}
      {/* <div className="listing-page">
        <Breadcrumbs title="Cars" subtitle="Listings" />
      </div> */}

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <CarList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CarDashboard;
