import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className="flex gap-4">
            <Spinner label="Warning" color="warning" labelColor="warning" />
        </div>
    )
}

export default LoadingSpinner