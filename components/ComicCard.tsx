import Link from 'next/link';
import { useAppSelector } from 'hooks/useRedux';
import { mangaProps } from './LeftComic';
import { useBookmarks } from 'hooks/useBookmarks';
import { memo } from 'react';
import OverlayImage from './OverlayImage';
import { usePosition } from 'hooks/usePosition';
import Meta from './Meta';
import ReadImage from './ReadImage';

const Comic = ({ item, select: { source, type } }: any) => {
    const bookmark: boolean = useAppSelector(state => state.reducer4.bookmarks.some((bookmark: mangaProps) => (bookmark.slug === item.slug && bookmark.source === item.source)));
    const { addFollow, removeFollow } = useBookmarks(item, item.slug);
    const { handlePosition } = usePosition();

    const detail = (
        <Link href={`/manga/${item.slug}?source=${item.source ?? source}&type=${item.type ?? type}`} as={`/manga/${item.slug}`}>
            <a onClick={() => handlePosition()} className="hover:bg-white hover:text-red-500 duration-300 px-3 xl:px-5 py-1 bg-red-500 rounded-full font-semibold text-sm xl:text-base">Detail</a>
        </Link>
    );
    const chapter = item.chapter && (
        <Link
            as={`/manga/${item.slug}/${item.chapSlug}`}
            href={{
                pathname: `/manga/${item.slug}/${item.chapSlug}`,
                query: { id: item.chapId, source, type, cover: item.cover }
            }}
        >
            <a onClick={() => handlePosition()} className="hover:bg-white xl:px-5 hover:text-link duration-300 px-3 py-1 bg-link rounded-full font-semibold text-sm xl:text-base">{item.chapter.replace('Chapter', 'Chap')}</a>
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
            <div className='group w-full h-0 pb-[150%] bg-gray-700 relative flex-grow overflow-hidden'>
                <OverlayImage>
                    {
                        detail
                    }
                    {
                        chapter
                    }
                    {
                        handleBookmark
                    }
                </OverlayImage>
                <ReadImage
                    src={item.cover}
                    alt="Đọc truyện tại MangaMAX"
                    className='absolute top-0 left-0 w-full object-cover h-full transition-opacity duration-[400ms]'
                />
                <Meta item={item} />
            </div>
            <div className='root p-2 bg-root text-white'>
                <Link href={`/manga/${item.slug}?source=${item.source ?? source}&type=${item.type ?? type}`} as={`/manga/${item.slug}`}>
                    <a onClick={() => handlePosition()} className='font-semibold text-center text-sm sm:text-base block'>
                        {item.title}
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default memo(Comic);