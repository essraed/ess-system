import React from 'react'
import Breadcrumbs from '../common/breadcrumbs'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import CategoryFilter from './CategoryFilter'
import CategoryList from './CategoryList'
import CategoryListForDashboard from './CategoryListForDashboard'

const CategoryDashboard = () => {
  
  const {categoryStore: {pagination}} = useStore();

  return (
    <>
    {/* // table filters */}
    <div className="listing-page">
      <Breadcrumbs title="Categorys" subtitle="Listings" />
      {/* Search */}
      <CategoryFilter pageSize={pagination?.pageSize}/>
      {/* /Search */}
    </div>
    
    {/* Car Grid View */}
    <section className="section car-listing pt-0">
      <div className="container">
        <div className="row">
          {/* //here the table */}

          {/* Payments Table */}
          <CategoryListForDashboard/>

          {/* /Payments Table */}
        </div>
      </div>
    </section>
  </>
  )
}

export default observer (CategoryDashboard)