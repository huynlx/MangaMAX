import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { callLoadingBar, removeLoadingBar } from '../shared/callLoadingBar';

const Page404: NextPage = () => {
    const select: any = useSelector((state: any) => state.reducer);
    
    useEffect(() => {
        callLoadingBar();
        return () => removeLoadingBar();
    }, [])

    return (
        <div className='px-[5vw] h-[auto]'>
            <img src={'/404.png'} className='w-[90%] sm:w-[70%] lg:w-[60%] xl:w-[45%] mx-[auto] mt-[2.5rem] my-[2rem]' alt='404' />
            <div className='text-left text-lg text-white mx-[auto] w-fit mb-2   '>
                <h1 className='mb-2'>Trong lúc chúng tôi đang giải quyết vấn đề của bạn, bạn có thể thử:</h1>
                <ul className='mx-auto w-fit ml-4 md:ml-[auto]'>
                    <li className='list-disc leading-[2]'>Sửa lại đường dẫn truy cập.</li>
                    <li className='list-disc leading-[2]'>Trở lại trang chủ, và xem một vài truyện mới đăng.</li>
                    <li className='list-disc leading-[2]'>Sử dụng chức năng tìm kiếm bên trên.</li>
                    <li className='list-disc leading-[2]'>Thay đổi server khác.</li>
                </ul>
            </div>
            <Link href={`/?source=${select.source}&type=${select.type}`}>
                <p className='text-center text-lg p-3 px-9 w-fit mx-[auto] border-2 duration-300 hover:border-link hover:text-primary rounded-full hover:bg-link'>Go to Home</p>
            </Link>
        </div>
    )
}

export default Page404;