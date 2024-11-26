import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import LetterFilter from './LetterFilter'
import LetterList from './LetterList'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

const LetterDashboard = () => {
  
  const {documentStore: {pagination}} = useStore();

  return (
    <>
    {/* // table filters */}
    <div className="listing-page">
      <Breadcrumbs title="Letters" subtitle="Listings" />
      {/* Search */}
      <LetterFilter pageSize={pagination?.pageSize}/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <LetterList/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default observer (LetterDashboard)