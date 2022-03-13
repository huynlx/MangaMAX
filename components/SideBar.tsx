import { memo, useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from 'shared/useOnClickOutside';
import { FaCompass } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const LeftSideBar = dynamic(() => import('components/LeftSideBar'));

const SideBar = ({ className, id }: any) => {
    const ref = useRef(null);
    const [active, setActive] = useState(false);
    const [show, setShow] = useState(false);

    const openNav = useCallback(() => {
        !show && setShow(true);
    }, [show]);

    const closeNav = useCallback(() => {
        show && setShow(false);
    }, [show]);

    useOnClickOutside(ref, () => closeNav());

    return (
        <div
            ref={ref}
            className={'z-20 ml-auto pr-3 ' + className}
            title='Source'
        >
            {
                active && <LeftSideBar
                    id={id}
                    closeNav={closeNav}
                    show={show}
                />
            }
            <span
                className='hover:text-white transition duration-300'
                style={{ fontSize: '30px', cursor: 'pointer' }}
                onMouseOver={() => !active && setActive(true)}
                onClick={() => openNav()}
            >
                <FaCompass />
            </span>
        </div >

    );
};

export default memo(SideBar);