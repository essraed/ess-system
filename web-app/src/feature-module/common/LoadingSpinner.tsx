import { Spinner } from '@nextui-org/react';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div 
            className="flex justify-center items-center h-screen" // استخدام Flexbox لمركزية العنصر
        >
            <Spinner 
                label="Loading..." 
                color="secondary" 
                labelColor="primary" 
            />
        </div>
    );
}

export default LoadingSpinner;
