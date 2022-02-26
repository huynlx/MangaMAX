import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import SideBar from './SideBar';

const Navbar: NextPage<any> = () => {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const router = useRouter();
    const { pathname } = router;

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue.trim())
            router.push({
                pathname: "/search",
                query: {
                    keyword: inputValue.trim(),
                },
            });
    };

    return (
        <div className={`${isActive ? 'h-28' : 'h-14'} md:h-14 bg-nav flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[5vw]`}>
            <div className='flex items-center justify-between'>
                <Link href="/">
                    <a className={`flex items-center justify-start gap-3 ${pathname == '/' && 'pointer-events-none'}`}>
                        <img src="/favicon.ico" className="w-7 h-7" alt="icon" />
                        <h1 className="text-2xl font-bold">
                            <span className="text-link font-bold borderText">Nát</span>Truyen
                        </h1>
                    </a>
                </Link>
                <SideBar className='block md:hidden' id='sidenav1' />
                <button className="md:hidden block">
                    <i
                        onClick={() => setIsActive((prev) => !prev)}
                        className={`fas ${isActive ? "fa-times" : "fa-search"} text-white text-2xl`}
                    ></i>
                </button>
            </div>
            <SideBar className='hidden md:block' id='sidenav2' />
            <form
                className={`${isActive ? 'flex' : 'hidden'} md:flex`}
                onSubmit={handleFormSubmit}
            >
                <button type='submit' className="flex-shrink-0 flex justify-center items-center h-8 w-8 bg-white hover:bg-[#DEDFE0]">
                    <i className="fas fa-search text-black text-lg"></i>
                </button>
                <input
                    type="text"
                    className="h-8 px-3 flex-grow text-black outline-none"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Navbar;