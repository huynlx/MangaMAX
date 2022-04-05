import { FC, memo, useCallback, useState } from 'react';
import { FaCompass } from 'react-icons/fa';
import LeftSideBar from 'components/LeftSideBar';
import { IoListSharp } from 'react-icons/io5';
import OverlayModal from './OverlayModal';

const SideBar: FC<{ className: string, id: string }> = ({ className, id }) => {
    const [overlay, setOverlay] = useState(false);

    const openNav = useCallback(() => {
        document.getElementById(id)!.style.left = "0";
        setOverlay(true);
    }, [])
    const closeNav = useCallback(() => {
        document.getElementById(id)!.style.left = "-250px";
        setOverlay(false)
    }, [])

    return (
        <div className={'ml-0 lg:ml-auto pr-3 ' + className} title='Sources'>
            <OverlayModal isOpen={overlay} onClose={closeNav} className='bg-[#00000080]' />
            <LeftSideBar
                id={id}
                closeNav={closeNav}
            />
            <span
                className='hover:text-white transition duration-300 cursor-pointer text-[30px]'
                onClick={openNav}
            >
                <FaCompass className='hidden lg:block' />
                <IoListSharp className='block lg:hidden' />
            </span>
        </div >
    );
};

export default memo(SideBar);