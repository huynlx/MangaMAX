import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CustomSquare from '../Loading/CustomSquare';
import Spinner from '../Loading/Spinner';
import ReadImage from '../Shared/ReadImage';

const SideRight = ({
  chapter,
  nextChap,
  width,
  loadChapter,
  view,
  index
}: any) => (
  <div className={`flex flex-col items-center transition-all mx-auto duration-500 ${width ? 'ml-[24%]' : 'ml-0'}`}>
    <p className="text-2xl px-[5vw]">
      {/* <Link href={`/manga/${comicSlug}?source=${chapter.source}`}>
          <a className="text-main">{chapter.title}</a>
        </Link>
        <span className='w-full'> {chapter.chapterCurrent} <small>{chapter.updateAt}</small></span> */}
    </p>
    {/* <Navigation
          chapters={chapter.chapters}
          source={chapter.source}
          chapterId={chapterId}
          comicSlug={comicSlug}
          select={select}
          select2={select2}
        /> */}
    <div className={`min-h-[100vh] w-full relative`}>
      {loadChapter && <CustomSquare />}
      {!loadChapter && chapter.images?.map((image: string, index: number) => <ReadImage
        className={`${view.className} mx-auto object-cover h-auto transition-opacity`}
        key={index}
        src={image}
        icon={Spinner}
        className3='text-logo-darken'
        alt='Đọc truyện tại Manga Max' />)}
    </div>
    {!loadChapter &&
      <div className={`w-full h-60 p-8 mb-20 ${index < 1 && 'hidden'}`}>
        <button onClick={nextChap} className="w-full h-full border-2 border-dashed border-gray-600 text-gray-600 hover:border-white hover:text-white transition duration-300 flex items-center justify-center">
          <p className="text-2xl flex gap-3 items-center">Next Chapter <FaArrowRight className='mt-[3px]' /></p>
        </button>
      </div>}
  </div>
);

export default SideRight;