import { NextPage } from 'next';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../shared/useOnClickOutside';
import {  useSelector } from 'react-redux';
import Router from 'next/router'
import { SOURCES } from '../shared/constants';

const SideBar: NextPage<any> = ({ className, id }) => {
    const ref = useRef(null);
    const select: any = useSelector((state: any) => state.reducer);

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
                            Router.push({
                                pathname: '/',
                                query: { source: item.source }
                            }, '/')
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