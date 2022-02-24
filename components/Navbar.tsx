import Link from 'next/link';
import React from 'react';
// import { useState } from "react";

const Navbar = () => {
    // const [isActive, setIsActive] = useState(false);

    return (
        <div className='h-14 md:!h-14 bg-nav flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[5vw]'>
            <div className='flex items-center justify-between'>
                <Link href="/">
                    <a className="flex items-center justify-start gap-3">
                        <img src="/logo.png" className="w-6 h-6" alt="icon" />
                        <h1 className="text-2xl font-bold">
                            <span className="text-link font-bold borderText">Nát</span>Truyen
                        </h1>
                    </a>
                </Link>
            </div>
            <form action="" className='hidden md:flex'>

            </form>
        </div>
    );
};

export default Navbar;