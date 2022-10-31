import { FC, memo, useCallback, useEffect, useState } from 'react';
import LeftSideBar from '@/components/Header/LeftSideBar';
import { IoListSharp } from 'react-icons/io5';
import RightSideBar from '@/components/Header/RightSideBar';
import OverlayModal from '@/components/Shared/OverlayModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAppSelector } from '@/hooks/useRedux';

const SideBar: FC<{ className: string, id1: string, id2: string; }> = ({ className, id1, id2 }) => {
    const matches = useMediaQuery('(min-width: 1024px)');

    const [overlay, setOverlay] = useState<any>({
        left: {
            status: false,
            onClose: null
        },
        right: {
            status: false,
            onClose: null
        }
    });

    const [mobile, setMobile] = useState<boolean>(false);

    const openLeftNav = useCallback(() => {
        document.getElementById(id1)!.style.left = '0';
        if (matches) {
            document.body.style.removeProperty("margin-left");
            document.documentElement.style.removeProperty('--padding-x');
            document.getElementById('logo1')!.style.display = 'none';
        }

        setOverlay({ ...overlay, left: { status: true, onClose: closeLeftNav } });
    }, [matches, overlay]);

    const closeLeftNav = useCallback(() => {
        document.getElementById(id1)!.style.left = '-230px';
        if (matches) {
            document.body.style.marginLeft = '0px';
            document.documentElement.style.setProperty('--padding-x', '5vw');
            document.getElementById('logo1')!.removeAttribute('style');
        }

        setOverlay({ ...overlay, left: { status: false, onClose: null } });
    }, [matches, overlay]);

    const openRightNav = useCallback(() => {
        document.getElementById(id2)!.style.right = "0";

        setOverlay({ ...overlay, right: { status: true, onClose: closeRightNav } });
    }, [overlay]);

    const closeRightNav = useCallback(() => {
        document.getElementById(id2)!.removeAttribute('style');

        setOverlay({ ...overlay, right: { status: false, onClose: null } });
    }, [overlay]);

    useEffect(() => {
        if (matches) {
            !overlay.left.status && openLeftNav();
            mobile && setMobile(false);
        } else {
            overlay.left.status && closeLeftNav();
            !mobile && setMobile(true);
        }
    }, [matches]);

    return (
        <div className={'ml-0 lg:ml-auto py-1 rounded-full mr-3 ' + className}>
            {
                (mobile || overlay.right.status) && <OverlayModal
                    isOpen={overlay.right.status || overlay.left.status}
                    onClose={overlay.right.onClose || overlay.left.onClose}
                    className={`bg-[#00000080]`}
                />
            }
            <LeftSideBar
                id={id1}
                closeNav={closeLeftNav}
            />
            <RightSideBar
                id={id2}
                closeNav={closeRightNav}
            />

            <span
                className='lg:absolute lg:top-2/4 lg:-translate-y-2/4 left-[2vw] lg:left-x text-[30px] hover:bg-shade-mid hover:bg-opacity-30 rounded-full lg:w-10 lg:h-10 flex items-center justify-center transition ease-out duration-100 hover:text-white'
                onClick={overlay.left.status ? closeLeftNav : openLeftNav}
            >
                <span data-v-6b3fd699="" className="hidden lg:flex pointer-events-none items-center justify-center font-medium select-none">
                    <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path data-v-20f285ec="" d="M3 12h12M3 6h18M3 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <IoListSharp className='block lg:hidden' />
            </span>

            <span className='absolute top-2/4 -translate-y-2/4 right-[2vw] lg:right-x w-10 h-10 rounded-full' onClick={openRightNav} />
        </div >
    );
};

export default memo(SideBar);