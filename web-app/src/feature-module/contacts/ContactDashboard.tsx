import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import ContactFilter from './ContactFilter'
import ContactList from './ContactList'

const ContactDashboard = () => {
  
  return (
    <>
    {/* // table filters */}
    <div className="listing-page max-md:pt-7">
      <Breadcrumbs title="Contacts" subtitle="Listings" />

      {/* Search */}
      <ContactFilter/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <ContactList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default ContactDashboard