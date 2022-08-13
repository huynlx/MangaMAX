import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { NavigationProps } from '@/types';
import LinkCheck from '../Shared/LinkCheck';
import { FaChevronLeft, FaChevronRight, FaHome, FaList } from 'react-icons/fa';
import { useScroll } from '@/hooks/useScroll';

const Navigation = ({ chapters, chapterId, comicSlug, source }: NavigationProps) => {
    const direction = useScroll();
    const selectedIndex = chapters?.indexOf(chapters.find((chap) => chap.id === chapterId)!);
    const router = useRouter();

    const prevChapter = useCallback(() => {

        router.push({
            pathname: `/manga/${comicSlug}/${chapters[selectedIndex + 1].chap}`,
            query: {
                id: chapters[selectedIndex + 1].id,
                source: chapters[0].source
            }
        })
    }, [selectedIndex])
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/manga/${comicSlug}/${chapters[selectedIndex - 1].chap}`,
            query: {
                id: chapters[selectedIndex - 1].id,
                source: chapters[0].source
            }
        })
    }, [selectedIndex])
    const selectChapter = useCallback((chapterSlug: string) => {
        router.push({
            pathname: `/manga/${comicSlug}/${chapterSlug}`,
            query: {
                id: chapters.find((chap: { chap: any; }) => chap.chap === chapterSlug)?.id,
                source: chapters[0].source
            },
        });
    }, [])
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.keyCode === 37) {
                prevChapter();
            } else if (e.keyCode === 39) {
                nextChapter();
            }
        };
        window.addEventListener("keyup", handler);

        return () => window.removeEventListener("keyup", handler);
    }, [prevChapter, nextChapter]);

    useEffect(() => {
        if (!chapters[selectedIndex]) {
            router.push('/404')
        }
    }, [])

    return (
        <div className={`z-10 overflow-x-hidden flex items-center gap-1 w-full justify-center bg-[#0d0d0d] ${direction === 'up' && 'sticky top-0'}`}>
            <LinkCheck>
                <a><FaHome className='mr-2 hover:text-white transition' size={30} title='Home' /></a>
            </LinkCheck>
            <Link href={`/manga/${router.query.slug}?source=${source}`}>
                <a><FaList className='mr-2 hover:text-white transition' size={30} title='Info' /></a>
            </Link>
            <button title='Prev Chapter' disabled={selectedIndex === chapters?.length - 1} onClick={prevChapter} className='p-2 bg-main hover:bg-main-hover w-10 h-10 text-white disabled:opacity-50 transition'>
                <FaChevronLeft size={20} />
            </button>
            <label className='hidden' htmlFor="selectChapter"></label>
            <select
                name='selectChapter'
                onChange={(e) => selectChapter(e.target.value)}
                value={chapters[selectedIndex].chap}
                id="selectChapter"
                className='text-black p-2 h-10 my-1 max-w-[170px] sm:min-w-[300px] sm:max-w-[350px] outline-none'
            >
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.chap}>{item.name}</option>
                    ))
                }
            </select>
            <button title='Next Chapter' disabled={selectedIndex < 1} onClick={nextChapter} className='p-2 bg-main hover:bg-main-hover w-10 h-10 text-white disabled:opacity-50 transition'>
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default Navigation;