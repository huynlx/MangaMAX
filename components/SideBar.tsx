import { NextPage } from 'next';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../shared/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router'
import { SOURCES } from '../shared/constants';

const SideBar: NextPage<any> = ({ className, id }) => {
    const ref = useRef(null);
    const select: any = useSelector(state => state);

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
            className={'ml-auto pr-3 ' + className}
            title='Source'
        >
            <div id={id} className="sidenav">
                <div><a className="closebtn" onClick={() => closeNav()}>×</a></div>
                {
                    SOURCES.map(item => (
                        <div key={item.source} onClick={() => {
                            Router.push({
                                pathname: '/',
                                query: { source: item.source }
                            })
                        }}>
                            <a className={`text-center ${select.source == item.source && '!text-white !text-3xl'}`}>{item.name}</a>
                        </div>
                    ))
                }
            </div>
            <span className='hover:text-link transition duration-300' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openNav()}><i className="fa-solid fa-compass"></i></span>
        </div >

    );
};

export default SideBar;