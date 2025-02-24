
import React from "react";
import Breadcrumbs from "../common/breadcrumbs";
import BlogList from "./BlogList";

const BlogDashboard = () => {
  return (
    <>
      {/* // table filters */}
      <div className="listing-page">
        <Breadcrumbs title="Blogs" subtitle="Listings" />
      </div>

      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* //here the table */}

            {/* Payments Table */}
            <BlogList />

            {/* /Payments Table */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDashboard;
