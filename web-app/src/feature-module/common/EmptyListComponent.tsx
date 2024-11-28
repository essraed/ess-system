import React from 'react'
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath'

type Props = {
  label: string
}

const EmptyListComponent = ({ label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-gray-500 text-lg font-semibold">
        There are no {label} available.
      </p>
      <ImageWithBasePath
        lazyLoad={true}
        src="assets/empty-services.svg"
        alt="No Services"
        className="mt-4 w-24 h-24 opacity-75"
      />
    </div>
  )
}

export default EmptyListComponent