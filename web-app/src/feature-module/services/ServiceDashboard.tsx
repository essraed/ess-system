import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ServiceFilter from "./ServiceFilter";
import ServiceDashboardList from "./ServiceDashboardList";

const ServiceDashboard = () => {
  const {
    serviceStore: { pagination },
  } = useStore();

  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        <Breadcrumbs title="Services" subtitle="Listings" />
        {/* Search */}
        <ServiceFilter pageSize={pagination?.pageSize} />
        {/* /Search */}
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <ServiceDashboardList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default observer(ServiceDashboard);
