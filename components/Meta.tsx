import React from 'react';

const Meta: React.FC<any> = ({ item }) => {
  return (
    <>
      {item.status &&
        <small className='px-2 md:py-1 rounded-full absolute bg-green-400/[.7] md:font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.status}</small>}
      {item.hot &&
        <small className='px-4 md:py-1 rounded-full absolute bg-red-600/[.8] font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto] text-base'>{item.hot}</small>}
      {item.updateAt &&
        <small className='lg:leading-[1.1] px-2 md:py-1 rounded-full absolute bg-nav/[.7] md:font-semibold text-white bottom-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.updateAt}</small>}
    </>
  );
};

export default Meta;