import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { mangaProps } from '@/components/Info/LeftComic';
import { useBookmarks } from '@/hooks/useBookmarks';
import { FC, memo, useCallback } from 'react';
import OverlayImage from '@/components/Shared/OverlayImage';
import { usePosition } from '@/hooks/usePosition';
import Meta from '@/components/Shared/Meta';
import { recents } from '@/store/action';
import { mangaObj } from '@/constants/index';
import Image from "@/components/Shared/Image";


const Comic: FC<any> = ({ item }) => {
    const { reducer: { source, type }, reducer4: { bookmarks, layout } } = useAppSelector(state => state);
    const bookmark: boolean = bookmarks.some((bookmark: mangaProps) => (bookmark.slug === item.slug && bookmark.source === item.source));
    const { addFollow, removeFollow } = useBookmarks(item, item.slug);
    const { handlePosition } = usePosition();
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        handlePosition();
        dispatch(recents(mangaObj(item, item.slug, { source: source }, 'recents')));
    }, [item]);

    const detail = () => (
        <Link
            href={`/manga/${item.slug}?source=${item.source}`}
        >
            <a onClick={handleClick} className="hover:bg-white hover:text-red-500 duration-300 px-3 xl:px-5 py-1 bg-red-500 rounded-full font-semibold text-sm xl:text-base">Details</a>
        </Link>
    );

    const chapter = () => item.chapter && item.chapSlug && (
        <Link
            // as={`/manga/${item.slug}/${item.chapSlug}`}
            href={{
                pathname: `/manga/${item.slug}/${item.chapSlug}`,
                query: { id: item.chapId, source: item.source }
            }}
        >
            <a onClick={handleClick} className="max-w-[86%] hover:bg-white xl:px-5 hover:text-link duration-300 px-3 py-1 bg-link rounded-full font-semibold text-sm xl:text-base line-clamp-1">{item.chapter.replace('Chapter', 'Chap')}</a>
        </Link>
    );

    const handleBookmark = () => (
        <button
            onClick={bookmark ? removeFollow : addFollow}
            className="px-3 xl:px-5 py-1 bg-yellow-500 rounded-full font-semibold hover:bg-white hover:text-yellow-500 duration-300 text-sm xl:text-base"
        >
            {bookmark ? 'Un-bookmark' : 'Bookmark'}
        </button>
    );

    return (
        <div className={`flex flex-col items-stretch comic overflow-hidden ${layout === 1 ? 'rounded-xl' : 'rounded-[8px]'}`}>
            <div className={`group w-full h-0 ${layout === 1 ? 'pb-[155%]' : 'pb-[150%] rounded-[8px]'} bg-gray-700 relative flex-grow overflow-hidden`}>
                <OverlayImage>
                    {
                        detail()
                    }
                    {
                        chapter()
                    }
                    {
                        handleBookmark()
                    }
                </OverlayImage>
                <Image
                    src={item.cover}
                    alt="Đọc truyện tại MangaMAX"
                    className='absolute top-0 left-0 w-full object-cover h-full transition-opacity duration-[400ms]'
                />
                <Meta item={item} />
            </div>
            <div className={`root p-2 text-white ${layout === 1 && 'bg-root'}`}>
                <Link href={`/manga/${item.slug}?source=${item.source ?? source}&type=${item.type ?? type}`} as={`/manga/${item.slug}`}>
                    <a title={item.title} onClick={() => handlePosition()} className={`font-semibold text-center ${layout === 0 && 'line-clamp-1 !text-left'} text-sm sm:text-base block`}>
                        {item.title}
                    </a>
                </Link>

                {
                    layout !== 1 && <span className='leading-4 text-sm flex-col flex gap-0 text-gray-300'>{item.chapter}</span>
                }
            </div>
        </div>
    );
};

export default memo(Comic);