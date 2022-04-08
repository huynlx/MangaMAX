import { SOURCES } from 'constants/index';
import { useRouter } from 'next/router';
import { handleSource } from 'store/action';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { usePosition } from 'hooks/usePosition';
import { SidebarProps } from 'shared/types';
import { FC } from 'react';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { IoServerOutline } from 'react-icons/io5';
import { FiBookOpen, FiUsers } from 'react-icons/fi';
import { capitalizeFirstLetter } from 'shared/capitalizeFirstLetter';
import LinkCheck from './LinkCheck';
import { checkPathname } from './Navbar';

const LeftSideBar: FC<SidebarProps> = ({ id, closeNav }) => {
  const { reducer: select, reducer3 } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { handlePosition } = usePosition();
  const matches = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();
  const { pathname } = router;

  return (
    <div id={id} className={`sidenav z-20 w-[230px] lg:z-10 -left-[230px] lg:left-0 bg-accent px-4 pb-4`}>  {/* -left-[230px] */}
      <div className='py-4' id='logo'>
        <LinkCheck select={select} reducer3={reducer3}>
          <a className={`flex items-center justify-start gap-3 ${checkPathname(pathname) && 'pointer-events-none'}`}>
            <img src={`/_next/image?url=/favicon.ico&w=300&q=100`} width={40} height={40} alt="Logo" />
            <h1 className="text-2xl font-bold text-white">
              <span className="text-logo font-bold borderText">Manga</span>Max
            </h1>
          </a>
        </LinkCheck>
      </div>

      <div className='pb-2 text-white' id='for-you'>
        <div className='flex justify-start mb-2 px-2'>
          <FiUsers size={28} /> <span className='!text-[18px] font-bold mx-2'>For you</span>
        </div>

        {
          ['recents', 'bookmarks'].map((item) => (
            <p
              className={`!text-white rounded-md !text-[17px] px-4 py-2 ${select.type === item ? 'bg-logo font-bold' : 'font-semibold hover:bg-accent-lighten'}`}
              onClick={() => router.push(`/${item}`)}
              key={item}
            >
              {capitalizeFirstLetter(item)}
            </p>
          ))
        }
      </div>

      <div className='pb-2 text-white' id='titles'>
        <div className='flex justify-start mb-2 px-2'>
          <FiBookOpen size={28} /> <span className='!text-[18px] font-bold mx-2'>Titles</span>
        </div>

        {
          ['latest', 'browse'].map((item) => (
            <p
              className={`!text-white rounded-md  !text-[17px] px-4 py-2 ${select.type === item ? 'bg-logo font-bold' : 'font-semibold hover:bg-accent-lighten'}`}
              onClick={() => {
                dispatch(handleSource(select.source, item));
                router.push('/');
              }}
              key={item}
            >
              {capitalizeFirstLetter(item)}
            </p>
          ))
        }
      </div>

      <div className='pb-2 text-white' id='servers'>
        <div className='flex justify-start mb-2 px-2'>
          <IoServerOutline size={28} /> <span className='!text-[18px] font-bold mx-2'>Servers</span>
        </div>

        {SOURCES.map((item) => (
          <p
            className={`!text-white rounded-md !text-[17px] px-4 py-2 ${select.source == item.source ? 'bg-logo !font-bold' : 'font-semibold hover:bg-accent-lighten'}`}
            onClick={() => {
              dispatch(handleSource(item.source, select.type));
              handlePosition(0);
              router.push('/');
              !matches && closeNav();
            }}
            key={item.source}
          >
            {item.name}
          </p>
        ))}
      </div>

      <div className="flex text-sm md:col-span-4 pt-4 px-2 text-white font-semibold">
        © MangaMax 2022
      </div>
    </div>
  );
};

export default LeftSideBar;