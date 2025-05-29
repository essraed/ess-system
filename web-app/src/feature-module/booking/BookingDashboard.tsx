import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import Breadcrumbs from "../common/breadcrumbs";
import React from "react";
import BookingList from "./BookingList";
import BookingFilter from "./BookingFilter";

const BookingDashboard = () => {
  const { bookingStore: { pagination } } = useStore();

  return (
    <>
      {/* Dashboard Header and Filters */}
      <div className="listing-page max-md:pt-7 mt-5">
        <Breadcrumbs title="Bookings" subtitle="Listings" />
        {/* Search and Filters */}
        <BookingFilter pageSize={pagination?.pageSize} />
      </div>

      {/* Booking Grid View */}
      <section className="section booking-listing pt-0">
        <div className="container">
          <div className="row">
            {/* Booking Table */}
            <BookingList />
            {/* /Booking Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default observer(BookingDashboard);
