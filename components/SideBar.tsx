import { NextPage } from 'next';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../shared/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router'

const SideBar: NextPage<any> = ({ className, id }) => {
    const ref = useRef(null);
    const select: any = useSelector(state => state);
    // console.log(select);
    

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
                <Link href="javascript:void(0)"><a className="closebtn" onClick={() => closeNav()}>×</a></Link>
                <Link href={{
                    pathname: '/',
                    query: { source: '1' }
                }}>
                    <a className={`text-center ${select.source == '1' && '!text-white !text-3xl'}`}>Server 1</a>
                </Link>
                <Link href={{
                    pathname: '/',
                    query: { source: '2' }
                }}>
                    <a className={`text-center ${select.source == '2' && '!text-white !text-3xl'}`}>Server 2</a>
                </Link>
                <Link href={{
                    pathname: '/',
                    query: { source: '3' }
                }}>
                    <a className={`text-center ${select.source == '3' && '!text-white !text-3xl'}`}>Server 3 (18+)</a>
                </Link>
            </div>
            <span className='hover:text-link transition duration-300' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openNav()}><i className="fa-solid fa-compass"></i></span>
        </div >

    );
};

export default SideBar;