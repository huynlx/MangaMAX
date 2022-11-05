import { useRouter } from 'next/router';
import { useState } from 'react';
import SideBar from '@/components/Home/SideBar';
import { titleCase } from '@/shared/cmanga/titleCase';
import { GrClose } from 'react-icons/gr';
import Dropdown from '@/components/Header/Dropdown';
import { useScroll } from '@/hooks/useScroll';
import { useAppSelector } from '@/hooks/useRedux';
import LinkCheck from '@/components/Shared/LinkCheck';
import Input from '@/components/Shared/Input';

export const checkPathname = (pathname: string): boolean => {
    return ['/', '/search', '/bookmarks', '/recents'].some((item: string) => item === pathname);
};

const Navbar = ({ scroll }: { scroll: boolean; }) => {
    const direction = useScroll();
    const { reducer: select } = useAppSelector((state) => state);
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const { pathname } = router;
    const checkScroll: boolean = scroll && checkPathname(pathname);

    return (
        <div id='navbar' className={`${isActive ? 'h-[6.4rem]' : 'h-[3.4rem]'} lg:h-14 justify-evenly gap-0 bg-primary flex flex-col lg:flex-row lg:justify-between items-stretch lg:items-center px-[2vw] lg:px-x ${(!router.pathname.includes('chap') && direction === 'up') ? 'sticky top-0 z-20' : 'relative'} ${checkScroll && '!bg-accent !bg-opacity-[.97]'}`}>
            <div className='flex items-center justify-between'>
                <LinkCheck>
                    <a id='logo1' className={`items-center ml-[50px] hidden lg:flex justify-start gap-3`}>
                        <Navbar.Logo />
                    </a>
                </LinkCheck>
                <SideBar
                    className='block lg:hidden'
                    id1='leftNav'
                    id2='rightNav'
                />
                <button aria-label="Search" className="ml-auto lg:hidden block" onClick={() => setIsActive((prev) => !prev)}>
                    {
                        isActive ? <GrClose className='invert' size={25} /> : <svg data-v-20f285ec="" data-v-3824af96="" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-black dark:text-icon-white text-false icon text-white">
                            <path data-v-20f285ec="" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                </button>
                <Dropdown className='block lg:hidden' dataId='rightNav' />
            </div>
            {
                checkScroll && <h1 className='font-semibold text-white text-xl lg:text-2xl top-[12px] lg:top-[10px] absolute left-2/4 transform -translate-x-2/4'>{titleCase(select.type)}</h1>
            }
            <SideBar
                className='hidden lg:block'
                id1='leftNav2'
                id2='rightNav2'
            />
            <Input isActive={isActive} checkScroll={checkScroll} />
            <Dropdown
                className='hidden lg:block'
                dataId='rightNav'
            />
        </div >
    );
};

// eslint-disable-next-line react/display-name
Navbar.Logo = () => (
    <>
        <img src={`/_next/image?url=/favicon.ico&w=300&q=100`} width={41} height={41} alt="Logo" />
        <h1 className="text-xl text-white transition flex-col flex">
            <span className='text-[1.35rem] font-bold leading-6'>Manga Max</span>
            <small className='text-gray-400 leading-6'>free manga online</small>
        </h1>
    </>
);

export default Navbar;