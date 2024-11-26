import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import CategoryFilter from './CategoryFilter'
import CategoryDashboardList from './CategoryDashboardList'

const CategoryDashboard = () => {
  
  return (
    <>
    {/* // table filters */}
    <div className="listing-page">
      <Breadcrumbs title="Categorys" subtitle="Listings" />

      {/* Search */}
      <CategoryFilter/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <CategoryDashboardList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default CategoryDashboard