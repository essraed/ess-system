import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import ComplaintFilter from './ComplaintFilter'
import ComplaintList from './ComplaintList'
const ComplaintDashboard = () => {
  
  return (
    <>
    {/* // table filters */}
    <div className="listing-page max-md:pt-7">
      <Breadcrumbs title="Complaints" subtitle="Listings" />

      
      <ComplaintFilter/> 
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <ComplaintList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default ComplaintDashboard