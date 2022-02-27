import { NextPage } from 'next';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../shared/useOnClickOutside';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router'

const SideBar: NextPage<any> = ({ className, id }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    function openNav() {
        document.getElementById(id)!.style.width = "250px";
    }
    function closeNav() {
        document.getElementById(id)!.style.width = "0";
    }

    useOnClickOutside(ref, () => closeNav());

    return (
        <div
            ref={ref}
            className={'hover:text-link transition duration-300 ml-auto pr-3 ' + className}
            title='Source'
        >
            <div id={id} className="sidenav">
                <Link href="javascript:void(0)"><a className="closebtn" onClick={() => closeNav()}>×</a></Link>
                <Link href={{
                    pathname: '/',
                    query: { source: 'nettruyen' }
                }}>
                    <a className='text-center'>NetTruyen</a>
                </Link>
                <Link href={{
                    pathname: '/',
                    query: { source: 'nhattruyen' }
                }}>
                    <a className='text-center'>NhatTruyen</a>
                </Link>
            </div>
            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openNav()}><i className="fa-solid fa-compass"></i></span>
        </div >

    );
};

export default SideBar;