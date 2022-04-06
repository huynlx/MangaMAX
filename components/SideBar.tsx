import { FC, memo, useCallback, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import { IoListSharp } from 'react-icons/io5';
import RightSideBar from 'components/RightSideBar';
import OverlayModal from './OverlayModal';

const SideBar: FC<{ className: string, id1: string, id2: string, user: any }> = ({ className, id1, id2, user }) => {
    const [overlay, setOverlay] = useState<{ side: string, status: boolean, onClose: () => void }>({
        side: '',
        status: false,
        onClose: () => { }
    });

    const openLeftNav = useCallback(() => {
        document.getElementById(id1)!.style.left = "0";
        setOverlay({ side: 'left', status: true, onClose: closeLeftNav });
    }, [])
    const closeLeftNav = useCallback(() => {
        document.getElementById(id1)!.style.left = "-250px";
        setOverlay({ side: 'left', status: false, onClose: closeLeftNav });
    }, [])
    const openRightNav = useCallback(() => {
        document.getElementById(id2)!.style.right = "0";
        setOverlay({ side: 'right', status: true, onClose: closeRightNav });
    }, [])
    const closeRightNav = useCallback(() => {
        document.getElementById(id2)!.style.right = "-270px";
        setOverlay({ side: 'right', status: false, onClose: closeLeftNav });
    }, [])

    return (
        <div className={'ml-0 lg:ml-auto p-1 rounded-full mr-3 ' + className}>
            <OverlayModal isOpen={overlay.status} onClose={overlay.onClose} className='bg-[#00000080]' />
            <LeftSideBar
                id={id1}
                closeNav={closeLeftNav}
            />
            <RightSideBar
                id={id2}
                closeNav={closeRightNav}
                user={user}
            />

            <span className='absolute top-2/4 -translate-y-2/4 right-[2vw] lg:right-[5vw] w-10 h-10 rounded-full' onClick={openRightNav} />

            <span
                className='hover:text-white duration-200 cursor-pointer text-[30px]' onClick={openLeftNav}>
                <span data-v-6b3fd699="" className="hidden lg:flex pointer-events-none items-center justify-center font-medium select-none">
                    <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-currentColor w-7 h-7">
                        <path data-v-20f285ec="" d="M3 12h12M3 6h18M3 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <IoListSharp className='block lg:hidden' />
            </span>
        </div >
    );
};

export default memo(SideBar);