import Router from 'next/router';

const Component404 = () => (
    <div className='px-[5vw] h-[auto]'>
        <img src={'/_next/image?url=/404.png&w=1920&q=75'} className='w-[90%] sm:w-[70%] lg:w-[60%] xl:w-[45%] mx-[auto] mt-[2.5rem] my-[2rem]' alt='404' />
        <div className='text-left text-lg text-white mx-[auto] w-fit mb-3'>
            <h1 className='mb-1'>Trong lúc chúng tôi đang giải quyết vấn đề của bạn, bạn có thể thử:</h1>
            <ul className='mx-auto w-fit ml-4 md:ml-[auto]'>
                <li className='list-disc md:leading-[1.5]'>Thử lại vào lúc khác.</li>
                <li className='list-disc md:leading-[1.5]'>Sửa lại đường dẫn truy cập.</li>
                <li className='list-disc md:leading-[1.5]'>Trở lại trang chủ, và xem một vài truyện mới đăng.</li>
                <li className='list-disc md:leading-[1.5]'>Sử dụng chức năng tìm kiếm bên trên.</li>
                <li className='list-disc md:leading-[1.5]'>Thay đổi server khác.</li>
            </ul>
        </div>
        <button onClick={() => Router.back()} className='block text-center text-lg p-3 px-9 w-fit mx-[auto] border-2 duration-300 hover:border-link rounded-full hover:bg-link hover:text-white'>Go Back</button>
    </div>
)

export default Component404;