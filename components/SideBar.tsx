import React, { useRef } from 'react';
import { useOnClickOutside } from '../shared/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import { SOURCES } from '../shared/constants';
import { handleSource } from '../store/action';

const SideBar = ({ className, id }: any) => {
    const ref = useRef(null);
    const select: any = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();

    function openNav() {
        document.getElementById(id)!.style.left = "0";
    }
    function closeNav() {
        document.getElementById(id)!.style.left = "-250px";
    }

    useOnClickOutside(ref, () => closeNav());

    return (
        <div
            ref={ref}
            className={'z-20 ml-auto pr-3 ' + className}
            title='Source'
        >
            <div id={id} className="sidenav">
                <div><a className="closebtn" onClick={() => closeNav()}>×</a></div>
                {
                    SOURCES.map(item => (
                        <div key={item.source} onClick={() => {
                            dispatch(handleSource(item.source, 'latest'));
                            dispatch({ type: 'SCROLL_POSITION', payload: { scrollPosition: 0 } });
                            Router.push('/');
                        }}>
                            <a className={`text-center ${select.source == item.source && '!text-white !text-3xl'}`}>{item.name}</a>
                        </div>
                    ))
                }
            </div>
            <span className='hover:text-white transition duration-300' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openNav()}><i className="fa-solid fa-compass"></i></span>
        </div >

    );
};

export default SideBar;