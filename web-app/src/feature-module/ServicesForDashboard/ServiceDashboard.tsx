import React, { useEffect } from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import ServiceFilter from './ServiceFilter'
import ServiceListForDashboard from './ServiceListForDashboard'

const ServiceDashboard = () => {
  
  const {serviceStore: {pagination}} = useStore();

  useEffect(()=>{
    console.log("services");
  })

  return (
    <>
    {/* // table filters */}
    <div className="listing-page">
      <Breadcrumbs title="Categorys" subtitle="Listings" />
      {/* Search */}
      <ServiceFilter pageSize={pagination?.pageSize}/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <ServiceListForDashboard/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default observer (ServiceDashboard)