import { useAppSelector } from '@/hooks/useRedux';
import { ChaptersProps } from '@/types';
import Link from 'next/link';
import Router from 'next/router';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { FaChevronLeft, FaHome } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import LinkCheck from '../Shared/LinkCheck';
import Button from '../Shared/Button';
import { handleTypes } from '@/store/types';

const SideLeft = ({
  chapter,
  chapters,
  comicSlug,
  setWidth,
  width,
  chapterId,
  view,
  setView,
  loadChapter
}: any) => {
  const [currentChap, setCurrentChap] = useState<string>('');
  const { icon: Icon, mode } = view;
  const [filterChap, setFilterChap] = useState<ChaptersProps[] | null | any>(null);
  const dispatch = useDispatch();

  const { reducer4: { recents } } = useAppSelector(state => state);
  const reading = [...recents].reverse()[0];

  const clickViewSelect = useCallback(() => {
    if (mode === 'fit') {
      setView({ maxWidth: true });
    } else if (mode === 'maxWidth') {
      setView({ natural: true });
    } else {
      setView({ fit: true });
    }
  }, [view]);

  const selectedIndex = filterChap?.indexOf(filterChap.find((chap: { id: any; }) => chap.id === chapterId)!);

  useLayoutEffect(() => {
    if (filterChap && selectedIndex !== -1 && filterChap[selectedIndex]) { //warning thôi đéo phải lỗi đâu
      setCurrentChap(filterChap[selectedIndex].name);
    }

    dispatch({
      type: handleTypes.FILTER_CHAPTER, payload: {
        chapters: filterChap,
        id: chapterId,
        index: selectedIndex
      }
    });
  }, [filterChap, chapterId, selectedIndex]);

  const prevChapter = useCallback(() => {
    Router.push({
      pathname: `/manga/${comicSlug}/${filterChap[selectedIndex + 1].chap}`,
      query: {
        id: filterChap[selectedIndex + 1].id,
        source: filterChap[0].source
      }
    });
  }, [selectedIndex, filterChap]);

  const nextChapter = useCallback(() => {
    Router.push({
      pathname: `/manga/${comicSlug}/${filterChap[selectedIndex - 1].chap}`,
      query: {
        id: filterChap[selectedIndex - 1].id,
        source: filterChap[0].source
      }
    });
  }, [selectedIndex, filterChap]);

  const selectChapter = useCallback((chapterSlug: string, chapterSource: string) => {
    Router.push({
      pathname: `/manga/${comicSlug}/${chapterSlug}`,
      query: {
        id: filterChap.find((chap: { chap: any; }) => chap.chap === chapterSlug)?.id,
        source: chapterSource
      },
    });
  }, [filterChap]);

  const renderTitle = useMemo(() => {
    const element = (
      <p className="text-xl flex justify-between items-center text-white">
        <LinkCheck>
          <a><Button><FaHome size={25} /></Button></a>
        </LinkCheck>
        <Link href={`/manga/${comicSlug}?source=${reading.source}`}>
          <a className="text-white font-semibold line-clamp-1 w-56 text-center hover:underline">{reading.title}</a>
        </Link>
        <Button onClick={() => setWidth(!width)}><FaChevronLeft size={20} /></Button>
        {/* <span className='w-full'> {chapter.chapterCurrent} <small>{chapter.updateAt}</small></span> */}
      </p>
    );

    return element;
  }, [reading]);

  const renderViewSelect = () => (
    <>
      <Button onClick={clickViewSelect}>
        <Icon className='text-white' size={25} />
      </Button>
    </>
  );

  useLayoutEffect(() => {
    setFilterChap(chapters);
  }, [chapters]);

  useLayoutEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        !(selectedIndex === filterChap?.length - 1) && prevChapter();
      } else if (e.keyCode === 39) {
        !(selectedIndex < 1) && nextChapter();
      }
    };
    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, [prevChapter, nextChapter]);

  const renderListChapters = useMemo(() => (
    <div className='p-2 bg-[#0d0d0d] overflow-auto overscroll-contain h-full'>
      <ul className='list'>
        {filterChap?.map((item: ChaptersProps, i: number) => <li
          onClick={() => selectChapter(item.chap, item.source)}
          className={`cursor-pointer hover:bg-main py-1 ${selectedIndex === i && ' bg-main font-semibold'} text-white p-2 rounded-[3px] duration-75`}
          key={i}
        >
          {item.name}
        </li>
        )}
      </ul>
    </div>
  ), [filterChap, selectedIndex]);

  const renderContent = useMemo(() => {
    if (!filterChap) {
      return (
        <div className='flex justify-center gap-[7px] pr-2 h-full'>
          <ImSpinner8 className='animate-spin absolute top-[45%]' size={80} />
        </div>
      );
    } else {
      return (
        <>
          <div className='text-white currentChapter flex justify-between items-center w-full'>
            <Button
              className='disabled:opacity-50'
              disabled={selectedIndex === filterChap?.length - 1}
              onClick={prevChapter}
            >
              <BsArrowLeftCircle size={30} />
            </Button>

            <span className='font-semibold line-clamp-2 px-2 text-base text-center text-white'>{currentChap}</span>

            <Button
              className='disabled:opacity-50'
              disabled={selectedIndex < 1}
              onClick={nextChapter}
            >
              <BsArrowRightCircle size={30} />
            </Button>
          </div>

          <div className='viewMode flex justify-center'>
            {
              renderViewSelect()
            }
          </div>

          <div className='searchChapter w-full flex bg-root p-2'>
            <AiOutlineSearch className='text-white h-full basis-6' />
            <input
              name='searchChapter'
              className='w-full px-2 text-white bg-root outline-none'
              type="search"
              placeholder={'Enter the chapter to filter...'}
              onChange={(e) => onChangeSearch(e)}
            />
          </div>

          {
            filterChap?.length !== 0 && renderListChapters
          }
        </>
      );
    }
  }, [view, filterChap, currentChap]);

  const onChangeSearch = useCallback((e: { currentTarget: { value: any; }; }) => {
    const { value } = e.currentTarget;
    const filterData = chapters?.filter((item: ChaptersProps) => item.name.includes(value));
    setFilterChap(filterData);
  }, [chapters]);

  return (
    <div className={`h-screen left-0 top-0 bg-primary flex flex-col p-2 gap-2 ${!width ? 'translate-x-[-100%]' : 'translate-x-[0%]'} transition-all duration-[.4s] fixed z-30 w-[24%] prevent-page-scrolling`}>
      {
        renderTitle
      }
      {
        renderContent
      }
    </div>
  );
};

export default SideLeft;