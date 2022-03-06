import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import { titleCase } from '../shared/cmanga/titleCase';

const Navbar: NextPage<any> = ({ scroll }) => {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const select: any = useSelector((state: any) => state.reducer);

    const router = useRouter();
    const { pathname } = router;
    const asPath = router.asPath.split('?')[1] ? `/?${router.asPath.split('?')[1]}` : "/";

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue.trim())
            router.push({
                pathname: "/search",
                query: {
                    keyword: inputValue.trim(),
                    source: select.source
                },
            });
    };

    return (
        <div className={`${isActive ? 'h-28' : 'h-14'} md:h-14 bg-primary flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[3vw] md:px-[5vw] ${!router.pathname.includes('chap') ? 'sticky top-0 z-10' : 'relative'}`}>
            <div className='flex items-center justify-between'>
                <Link href={`/?source=${select.source}&type=${select.type}`}>
                    <a className={`flex items-center justify-start gap-3 ${pathname == '/' && 'pointer-events-none'}`}>
                        <img src="/favicon.ico" className="w-9 h-8" alt="icon" />
                        <h1 className="text-2xl font-bold">
                            <span className="text-link font-bold borderText">Manga</span>MAX
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
            {
                (scroll && pathname == '/') && <h1 className='hidden lg:block font-bold text-2xl top-2/4 absolute left-2/4 transform -translate-x-2/4 -translate-y-2/4'>{titleCase(select.type)}</h1>
            }
            <SideBar className='hidden md:block' id='sidenav2' />
            <form
                className={`${isActive ? 'flex' : 'hidden'} md:flex border rounded-full overflow-hidden`}
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