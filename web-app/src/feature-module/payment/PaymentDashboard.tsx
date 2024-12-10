import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import PaymentFilter from './PaymentFilter'
import PaymentList from './PaymentList'

const PaymentDashboard = () => {
  
  return (
    <>
    {/* // table filters */}
    <div className="listing-page">
      <Breadcrumbs title="Payments" subtitle="Listings" />

      {/* Search */}
      <PaymentFilter/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <PaymentList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default PaymentDashboard