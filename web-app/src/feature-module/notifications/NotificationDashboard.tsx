import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import NotificationFilter from './NotificationFilter'
import NotificationList from './NotificationList'

const NotificationDashboard = () => {

  return (
    <>
    {/* // table filters */}
    <div className="listing-page max-md:pt-7">
      <Breadcrumbs title="Notifications" subtitle="Listings" />
      {/* Search */}
      <NotificationFilter/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <NotificationList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default NotificationDashboard