import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Spinner from '../Loading/Spinner';
import ReadImage from '../Shared/ReadImage';
// import { BsFillImageFill } from "react-icons/bs";
import CustomCircle from '../Loading/CustomCircle';

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
      {
        loadChapter &&
        <div className='absolute animate-pulse left-2/4 transform top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col'>
          {/* <BsFillImageFill size={50} className="self-center" /> */}
          <CustomCircle />
          {/* <p className='p-0 m-0 mt-3 text-center'>Loading</p> */}
        </div>
      }
      {
        !loadChapter && chapter.images?.map((image: string, index: number) =>
          <ReadImage
            className={`${view.className} mx-auto object-cover h-auto transition-opacity`}
            key={index}
            src={image}
            icon={Spinner}
            className3='text-logo-darken'
            alt='Đọc truyện tại Manga Max'
          />)
      }
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