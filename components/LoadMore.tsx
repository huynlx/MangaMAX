import React from 'react';
import {ImSpinner8} from 'react-icons/im'

const LoadMore = () => {
    return (
        <div className='hidden w-fit bg-gray-700 mx-auto px-20 py-2 border-transparent rounded-md md:block'>
            <ImSpinner8 className='animate-spin' size={30} />
        </div>
    );
};

export default LoadMore;