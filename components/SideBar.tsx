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
        document.getElementById(id)!.style.width = "250px";
    }
    function closeNav() {
        document.getElementById(id)!.style.width = "0";
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
                    query: { source: 'nettruyen' }
                }}>
                    <a className={`text-center ${select.source == 'nettruyen' && '!text-white !text-3xl'}`}>NetTruyen</a>
                </Link>
                <Link href={{
                    pathname: '/',
                    query: { source: 'nhattruyen' }
                }}>
                    <a className={`text-center ${select.source == 'nhattruyen' && '!text-white !text-3xl'}`}>NhatTruyen</a>
                </Link>
                <Link href={{
                    pathname: '/',
                    query: { source: 'lxhentai' }
                }}>
                    <a className={`text-center ${select.source == 'lxhentai' && '!text-white !text-3xl'}`}>HentaiLXX</a>
                </Link>
            </div>
            <span className='hover:text-link transition duration-300' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openNav()}><i className="fa-solid fa-compass"></i></span>
        </div >

    );
};

export default SideBar;