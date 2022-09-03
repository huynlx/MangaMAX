import { relativeTimeFromDates } from '@/utils/dateTime';
import { isValidDate } from '@/utils/isValidDate';
import { useRouter } from 'next/router';
import React from 'react';

const Meta: React.FC<any> = ({ item }) => {
  const { pathname } = useRouter();

  return (
    <>
      {item.status &&
        <small className='px-2 md:py-1 rounded-full absolute bg-green-400/[.8] md:font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.status}</small>}
      {item.hot &&
        <small className='px-4 md:py-1 rounded-full absolute bg-red-600/[.8] font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto] text-base'>{item.hot}</small>}
      {item.updateAt &&
        <small data-time={item.updateAt} className='lg:leading-[1.1] px-2 md:py-1 rounded-full absolute bg-nav/[.8] md:font-semibold text-white bottom-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>
          {
            isValidDate(new Date(item.updateAt)) ? relativeTimeFromDates(new Date(item.updateAt)) : item.updateAt
          }
        </small>}
      {(item.source && pathname.includes('bookmarks')) &&
        <small className='px-4 md:py-1 rounded-full absolute bg-logo/[.85] font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto] text-[14px]'>Server {item.source}</small>}
    </>
  );
};

export default Meta;