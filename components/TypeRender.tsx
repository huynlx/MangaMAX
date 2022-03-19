import Router from 'next/router';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { handleSource } from 'store/action';

const TypeRender = (type: string) => {
    const dispatch = useDispatch();
    const select: any = useSelector((state: any) => state.reducer);

    return (
        <h1
            className={`w-full font-semibold text-white text-2xl`}
        >
            {type}
            <span
                onClick={() => { dispatch(handleSource(select.source, 'latest')); Router.push(`/`); }}
                className='float-right flex text-gray-300 hover:text-white transition gap-1 font-normal'
            >
                <IoArrowBack size={30} /> Back
            </span>
        </h1>
    );
};

export default TypeRender;