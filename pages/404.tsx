import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const Page404: NextPage = () => {
    const select: any = useSelector((state: any) => state.reducer);

    return (
        <div className='px-[5vw]'>
            <img src={'/404.png'} className='w-[90%] sm:w-[70%] lg:w-[60%] xl:w-[45%] mx-[auto] my-[7rem]' alt='404' />
            <Link href={`/?source=${select.source}&type=${select.type}`}>
                <p className='text-center text-lg p-3 px-9 w-fit mx-[auto] border-2 duration-300 hover:border-[#248FFF] rounded-full hover:bg-[#248FFF]'>Go to Home</p>
            </Link>
        </div>
    )
}

export default Page404;