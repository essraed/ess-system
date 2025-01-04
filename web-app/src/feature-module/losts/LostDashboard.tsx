import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import LostFilter from './LostFilter'
import LostList from './LostList'

const LostDashboard = () => {
  
  return (
    <>
    {/* // table filters */}
    <div className="listing-page max-md:pt-7">
      <Breadcrumbs title="Losts" subtitle="Listings" />

      {/* Search */}
      <LostFilter/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <LostList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default LostDashboard