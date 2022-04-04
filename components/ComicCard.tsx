import Link from 'next/link';
import ReadImage from 'components/ReadImage';
import { useAppSelector } from 'hooks/useRedux';
import { mangaProps } from './LeftComic';
import { useBookmarks } from 'hooks/useBookmarks';
import { memo } from 'react';
import Overlay from './Overlay';

const Comic = ({ item, select: { source, type } }: any) => {
    const bookmark: boolean = useAppSelector(state => state.reducer4.bookmarks.some((bookmark: mangaProps) => (bookmark.slug === item.slug && bookmark.source === item.source)));
    const { addFollow, removeFollow } = useBookmarks(item, item.slug);

    const detail = (
        <Link href={`/manga/${item.slug}?source=${item.source ?? source}&type=${item.type ?? type}`} as={`/manga/${item.slug}`}>
            <a className="hover:bg-white hover:text-red-500 duration-300 px-3 xl:px-5 py-1 bg-red-500 rounded-full font-semibold text-sm xl:text-base">Detail</a>
        </Link>
    );
    const chapter = item.chapter && (
        <Link
            as={`/manga/${item.slug}/${item.chapSlug}`}
            href={`/manga/${item.slug}/${item.chapSlug}?id=${item.chapId}&source=${source}&type=${type}&cover=${item.cover}`}
        >
            <a className="hover:bg-white xl:px-5 hover:text-link duration-300 px-3 py-1 bg-link rounded-full font-semibold text-sm xl:text-base">{item.chapter.replace('Chapter', 'Chap')}</a>
        </Link>
    )
    const handleBookmark = (
        <button
            onClick={bookmark ? removeFollow : addFollow}
            className="px-3 xl:px-5 py-1 bg-yellow-500 rounded-full font-semibold hover:bg-white hover:text-yellow-500 duration-300 text-sm xl:text-base"
        >
            {bookmark ? 'Un-bookmark' : 'Bookmark'}
        </button>
    )

    return (
        <div className='flex flex-col items-stretch comic border overflow-hidden border-transparent rounded-xl'>
            <div className='group w-full h-0 pb-[155%] relative flex-grow bg-gray-400 overflow-hidden'>
                <Overlay>
                    {
                        detail
                    }
                    {
                        chapter
                    }
                    {
                        handleBookmark
                    }
                </Overlay>
                <ReadImage
                    className='object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-300'
                    src={item.cover}
                    color={item.color}
                    className3='absolute transform top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
                />
                {item.status &&
                    <small className='px-2 md:py-1 rounded-full absolute bg-green-400/[.7] md:font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.status}</small>}
                {item.hot &&
                    <small className='px-4 md:py-1 rounded-full absolute bg-red-600/[.8] font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto] text-base'>{item.hot}</small>}
                {item.updateAt &&
                    <small className='lg:leading-[1.1] px-2 md:py-1 rounded-full absolute bg-nav/[.7] md:font-semibold text-white bottom-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.updateAt}</small>}
            </div>
            <Link href={`/manga/${item.slug}?source=${item.source ?? source}&type=${item.type ?? type}`} as={`/manga/${item.slug}`}>
                <a>
                    <div className='root p-2 bg-root text-white'>
                        <h1 className='font-semibold max-w-full text-center flex-shrink-0 text-sm sm:text-base'>{item.title}</h1>
                        {/* <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.chapter}</p> */}
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default memo(Comic);