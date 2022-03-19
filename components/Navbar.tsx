import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { titleCase } from '../shared/cmanga/titleCase';
import LinkCheck from './LinkCheck';
import { handleSource } from '../store/action';
import { GrClose } from 'react-icons/gr';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'shared/firebase';

const Navbar = ({ scroll }: { scroll: boolean }) => {
    const [user] = useAuthState(auth);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const select: any = useSelector((state: any) => state.reducer);
    const { reducer3 }: any = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const router = useRouter();
    const { pathname } = router;

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch(handleSource(select.source, 'search'));
            dispatch({ type: 'SCROLL_POSITION', payload: { keyword: inputValue.trim(), scrollPosition: 0 } });
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
        <div className={`${isActive ? 'h-28' : 'h-14'} md:h-14 bg-primary flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[3vw] lg:px-[5vw] ${!router.pathname.includes('chap') ? 'sticky top-0 z-10' : 'relative'}`}>
            <div className='flex items-center justify-between'>
                <LinkCheck select={select} reducer3={reducer3}>
                    <a className={`flex items-center justify-start gap-3 ${(pathname == '/' || pathname === '/search') && 'pointer-events-none'}`}>
                        <img src={`/_next/image?url=/favicon.ico&w=300&q=75`} className="max-w-[2.25rem] max-h-[2rem]" alt="Logo" />
                        <h1 className="text-2xl font-bold text-white">
                            <span className="text-link font-bold borderText">Manga</span>MAX
                        </h1>
                    </a>
                </LinkCheck>
                <SideBar className='block md:hidden' id='sidenav1' />
                <button aria-label="Search" className="md:hidden block" onClick={() => setIsActive((prev) => !prev)}>
                    {
                        isActive ? <GrClose className='invert' size={25} /> : <FaSearch size={25} />
                    }
                </button>
            </div>
            {
                (scroll && (pathname == '/' || pathname == '/search')) && <h1 className='hidden lg:block font-bold text-2xl top-2/4 absolute left-2/4 transform -translate-x-2/4 -translate-y-2/4'>{titleCase(select.type)}</h1>
            }
            <SideBar className='hidden md:block' id='sidenav2' />
            <form
                className={`${isActive ? 'flex' : 'hidden'} md:flex border-gray-300 rounded-full overflow-hidden`}
                onSubmit={handleFormSubmit}
                id='myForm'
            >
                <button aria-label="Search" type='submit' className="bg-gray-300 flex-shrink-0 flex justify-center items-center h-8 w-8 hover:bg-white">
                    <FaSearch className='text-black' />
                </button>
                <input
                    type="text"
                    className="bg-gray-300 h-8 px-3 flex-grow text-black outline-none"
                    id='keyword'
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoComplete='off'
                />
            </form>
            <Link href={user ? '/dashboard' : '/login'}>
                {
                    user ?
                        <a>
                            <img
                                title={user.displayName!}
                                src={user?.photoURL!}
                                className='rounded-full ml-3'
                                alt=""
                                width={30}
                                height={30}
                            />
                        </a>
                        :
                        <a className='text-lg ml-3 text-white'>LOGIN</a>
                }
            </Link>
        </div>
    );
};

export default Navbar;