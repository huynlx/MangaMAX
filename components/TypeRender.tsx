import Router from 'next/router';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { handleSource } from 'store/action';

const TypeRender = (type: string) => {
    const dispatch = useDispatch();
    const select: any = useSelector((state: any) => state.reducer);

    return (
        <h1
            className={`w-full font-bold text-white sm:text-3xl text-2xl`}
        >
            {type}
            <span
                onClick={() => { dispatch(handleSource(select.source, 'latest')); Router.push(`/`); }}
                className='float-right flex text-gray-300 hover:text-white transition gap-1 font-normal text-xl sm:text-2xl'
            >
                <FaChevronLeft size={19} className='mt-[6px] sm:mt-[8px]' />  Back
            </span>
        </h1>
    );
};

export default TypeRender;