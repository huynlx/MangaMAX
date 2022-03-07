import { NextPage } from 'next';
import React, { memo } from 'react';

const Loader: NextPage = memo(() => (
    <div className={`loading z-30 p-5 rounded-md bg-nav opacity-[0.95]`}>
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
));

export default Loader;