import React from 'react';

const Loader = ({ className }: { className?: string }) => (
    <div className={`loading scale-[.67] lg:scale-[.85] -translate-x-2/4 -translate-y-1/2 z-10 p-5 rounded-md bg-nav/[.80] backdrop-blur-3xl ${className}`}>
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Loader;