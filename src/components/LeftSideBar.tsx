import { FORYOU, SOURCES, TITLES } from '@/constants/index';
import { useRouter } from 'next/router';
import { handleSource } from '@/store/action';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { usePosition } from '@/hooks/usePosition';
import { SidebarProps } from '@/shared/types';
import { FC, PropsWithChildren } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IoServerOutline } from 'react-icons/io5';
import { FiBookOpen, FiUsers } from 'react-icons/fi';
import { capitalizeFirstLetter } from '@/shared/capitalizeFirstLetter';
import LinkCheck from '@/components/LinkCheck';
import { checkPathname } from '@/components/Navbar';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

interface SectionProps {
  icon: React.ComponentType<{ size: number }>,
  name: string,
  id: string
}

const Section: FC<PropsWithChildren<SectionProps>> = ({ icon: Icon, name, id, children }) => {
  return (
    <div className='pb-2 text-white' id={id}>
      <div className='flex justify-start mb-1 px-2'>
        <Icon size={26} /> <span className='!text-[17px] font-bold mx-2'>{name}</span>
      </div>

      {children}
    </div>
  );
}

const LeftSideBar: FC<SidebarProps> = ({ id, closeNav }) => {
  const { reducer: select, reducer3, reducer4: { recents } } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { handlePosition } = usePosition();
  const matches = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();
  const { pathname } = router;
  const reading = recents.slice().reverse()[0];

  const p_style = (a: string, b: string) => `!text-white rounded-4 !text-[16px] px-4 py-[6px] ${select[b] === a ? 'bg-logo-darken font-bold' : ' hover:bg-accent-lighten font-semibold'}`;

  return (
    <div id={id} className={`sidenav z-20 w-[230px] lg:z-10 -left-[230px] lg:left-0 bg-accent px-4 pb-4`}>  {/* -left-[230px] */}
      <div className='py-4' id='logo2'>
        <LinkCheck select={select} reducer3={reducer3}>
          <a className={`flex items-center justify-start gap-3 ${checkPathname(pathname) && 'pointer-events-none'}`}>
            <img
              src={`/_next/image?url=/favicon.ico&w=300&q=100`}
              width={40}
              height={40}
              alt="Logo"
            />
            <h1 className="text-2xl font-bold text-white">
              <span className="text-logo font-bold borderText">Manga</span>Max
            </h1>
          </a>
        </LinkCheck>
      </div>

      {
        reading &&
        <Link as={`/manga/${reading.slug}`} href={reading.url.replace(/(?<=type=).*/, select.type)}>
          <a
            title={reading.title}
            id='reading'
            className='flex mb-4 gap-2'
            onClick={() => {
              handlePosition();
              !matches && closeNav();
            }}
          >
            <img
              className=' min-w-[2.75rem] h-11 border-2 rounded-full object-cover'
              src={reading.cover}
              alt="Cover"
              onError={(e) => e.currentTarget.src = '/_next/image?url=/onError.png&w=720&q=75'}
            />

            <div className='flex flex-col relative w-full'>
              <small className=' text-gray-400'>Now Reading <FaAngleRight size={16} className='text-white absolute right-0 top-[3.5px]' /></small>
              <h1 className='line-clamp-1 text-white font-bold'>{reading.title}</h1>
            </div>
          </a>
        </Link>
      }

      <Section
        icon={FiUsers}
        name='For you'
        id='for-you'
      >
        {FORYOU.map((item) => (
          <p
            className={p_style(item, 'type')}
            onClick={() => {
              handlePosition(0);
              router.push(`/${item}`);
              !matches && closeNav();
            }}
            key={item}
          >
            {capitalizeFirstLetter(item)}
          </p>
        ))}
      </Section>

      <Section
        icon={FiBookOpen}
        name='Titles'
        id='titles'
      >
        {TITLES.map((item) => (
          <p
            className={p_style(item, 'type')}
            onClick={() => {
              dispatch(handleSource(select.source, item));
              handlePosition(0);
              router.push('/');
              !matches && closeNav();
            }}
            key={item}
          >
            {capitalizeFirstLetter(item)}
          </p>
        ))}
      </Section>

      <Section
        icon={IoServerOutline}
        name='Servers'
        id='servers'
      >
        {SOURCES.map((item) => (
          <p
            className={p_style(item.source, 'source')}
            onClick={() => {
              dispatch(handleSource(item.source, /recents|search|bookmarks/.test(select.type) ? 'latest' : select.type));
              handlePosition(0);
              router.push('/');
              !matches && closeNav();
            }}
            key={item.source}
          >
            {item.name}
          </p>
        ))}
      </Section>

      <div className="flex text-sm md:col-span-4 pt-4 px-2 text-white font-semibold">
        © MangaMax 2022
      </div>
    </div>
  );
};

export default LeftSideBar;