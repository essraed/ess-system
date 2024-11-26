import React, { useEffect } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import WorkingTimeList from "./WorkingTimeList";

const WorkingTimeDashboard = () => {
  const {
    serviceStore: { pagination },
  } = useStore();

  useEffect(() => {
    console.log("services");
  });

  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        <Breadcrumbs title="WorkingTime" subtitle="Listings" />
        {/* Search */}
        {/* <ServiceFilter pageSize={pagination?.pageSize} /> */}
        {/* /Search */}
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <WorkingTimeList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default observer(WorkingTimeDashboard);
