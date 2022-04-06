import { useRouter } from 'next/router';
import { useState } from 'react';
import SideBar from './SideBar';
import { titleCase } from '../shared/cmanga/titleCase';
import LinkCheck from './LinkCheck';
import { GrClose } from 'react-icons/gr';
import Dropdown from './Dropdown';
import { useScroll } from 'hooks/useScroll';
import { useAppSelector } from 'hooks/useRedux';
import Input from './Input';

const Navbar = ({ scroll }: { scroll: boolean }) => {
    const direction = useScroll();
    const { reducer4: { user }, reducer: select, reducer3 } = useAppSelector((state) => state);
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const { pathname } = router;
    const checkPathname = (): boolean => {
        return ['/', '/search', '/bookmarks', '/recents'].some((item: string) => item === pathname);
    }
    const checkScroll: boolean = scroll && checkPathname();

    return (
        <div className={`${isActive ? 'h-[6.4rem]' : 'h-[3.4rem]'} lg:h-14 justify-evenly gap-0 bg-primary flex flex-col lg:flex-row lg:justify-between items-stretch lg:items-center px-[2vw] lg:px-[5vw] ${(!router.pathname.includes('chap') && direction === 'up') ? 'sticky top-0 z-20' : 'relative'}`}>
            <div className='flex items-center justify-between'>
                <LinkCheck select={select} reducer3={reducer3}>
                    <a className={`hidden lg:flex items-center justify-start gap-3 ${checkPathname() && 'pointer-events-none'}`}>
                        <img src={`/_next/image?url=/favicon.ico&w=720&q=75`} className="w-8 h-8 lg:w-10 lg:h-10" alt="Logo" />
                        <h1 className="text-2xl font-bold hidden sm:block text-white">
                            <span className="text-logo font-bold borderText">Manga</span>Max
                        </h1>
                    </a>
                </LinkCheck>
                <SideBar
                    user={user}
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
                <Dropdown className='block lg:hidden' user={user} dataId='rightNav' />
            </div>
            {
                checkScroll && <h1 className='font-semibold text-white text-xl lg:text-2xl top-[12px] lg:top-[10px] absolute left-2/4 transform -translate-x-2/4'>{titleCase(select.type)}</h1>
            }
            <SideBar
                user={user}
                className='hidden lg:block'
                id1='leftNav2'
                id2='rightNav2'
            />
            <Input isActive={isActive} />
            <Dropdown
                className='hidden lg:block'
                user={user}
                dataId='rightNav'
            />
        </div >
    );
};

export default Navbar;