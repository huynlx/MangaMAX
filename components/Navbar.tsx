import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { titleCase } from '../shared/cmanga/titleCase';
import LinkCheck from './LinkCheck';
import { setScroll } from '../store/action';
import { GrClose } from 'react-icons/gr';
import { FaSearch } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'shared/firebase';
import Dropdown from './Dropdown';
import { useScroll } from 'hooks/useScroll';

const Navbar = ({ scroll }: { scroll: boolean }) => {
    const direction = useScroll();
    const [user] = useAuthState(auth);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const select: any = useSelector((state: any) => state.reducer);
    const { reducer3 }: any = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const router = useRouter();
    const { pathname } = router;

    const checkPathname = (): boolean => {
        return ['/', '/search', '/bookmarks', '/recents'].some((item: string) => item === pathname);
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch(setScroll(0, inputValue.trim()));
            document.getElementById('keyword')?.blur();
            router.push({
                pathname: "/search",
                query: {
                    keyword: inputValue.trim(),
                    source: select.source,
                    type: 'search'
                },
            }, `/search/${inputValue.trim().replace(/ /g, '+')}`);
            // setInputValue(''); //reset form
        }
    };

    return (
        <div className={`${isActive ? 'h-[6.1rem]' : 'h-[3.4rem]'} lg:h-14 justify-evenly gap-0 bg-primary flex flex-col lg:flex-row lg:justify-between items-stretch lg:items-center px-[2vw] lg:px-[5vw] ${(!router.pathname.includes('chap') && direction === 'up') ? 'sticky top-0 z-10' : 'relative'}`}>
            <div className='flex items-center justify-between'>
                <LinkCheck select={select} reducer3={reducer3}>
                    <a className={`hidden lg:flex items-center justify-start gap-2 ${checkPathname() && 'pointer-events-none'}`}>
                        <img src={`/_next/image?url=/favicon.ico&w=720&q=100`} className="w-8 h-8 lg:w-10 lg:h-auto" alt="Logo" />
                        <h1 className="text-2xl font-bold text-white hidden sm:block">
                            <span className="text-[#D04A32] font-bold borderText">Manga</span>MAX
                        </h1>
                    </a>
                </LinkCheck>
                <SideBar className='block lg:hidden' id='sidenav1' />
                <button aria-label="Search" className="ml-auto lg:hidden block" onClick={() => setIsActive((prev) => !prev)}>
                    {
                        isActive ? <GrClose className='invert' size={25} /> : <FaSearch size={25} />
                    }
                </button>
                <Dropdown className='block lg:hidden' user={user} />
            </div>
            {
                (scroll && checkPathname()) && <h1 className='font-semibold text-white text-2xl top-[10px] lg:top-[10px] absolute left-2/4 transform -translate-x-2/4'>{titleCase(select.type)}</h1>
            }
            <SideBar className='hidden lg:block' id='sidenav2' />
            <form
                className={`${isActive ? 'flex' : 'hidden'} lg:flex border-gray-300 rounded-full overflow-hidden h-8`}
                onSubmit={handleFormSubmit}
                id='myForm'
            >
                <button aria-label="Search" type='submit' className="bg-gray-300 flex-shrink-0 flex justify-center items-center w-8 hover:bg-white">
                    <FaSearch className='text-black' />
                </button>
                <input
                    type="search"
                    className="bg-gray-300 px-3 flex-grow text-black outline-none"
                    id='keyword'
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoComplete='off'
                />
            </form>
            <Dropdown className='hidden lg:block' user={user} />
        </div >
    );
};

export default Navbar;