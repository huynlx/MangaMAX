import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import ReadImage from './ReadImage';
import { FaRegHeart } from 'react-icons/fa';
import { BsSuitHeartFill } from 'react-icons/bs';
import FollowIcon from 'components/Icon';
import { recents } from 'store/action';
import { mangaObj, regexMatchMultiString } from 'constants/index';
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useBookmarks } from 'hooks/useBookmarks';
import OverlayImage from 'components/OverlayImage';
import Modal from 'components/Modal';
import { BsFillImageFill } from 'react-icons/bs';

export interface mangaProps {
    title: string,
    cover: string,
    url: string,
    slug: string,
    source: string,
    type: string
}

const LeftComic: FC<any> = ({ info, select, slug }) => {
    const { reducer4: { bookmarks } } = useAppSelector(state => state);
    const [showModal, setShowModal] = useState<boolean>(false);
    const manga = mangaObj(info, slug, select, 'bookmarks');
    const follow = bookmarks.some((item: mangaProps) => item.url === manga.url);
    const dispatch = useAppDispatch();
    const { addFollow, removeFollow } = useBookmarks(info, slug);

    const handleShow = () => {
        setShowModal(true);
    }

    const handleHide = () => {
        setShowModal(false);
    }

    useEffect(() => {
        dispatch(recents(mangaObj(info, slug, select, 'recents')));
    }, [])

    return (
        <div className='lg:w-[59vw] lg:pr-10 max-h-[none] lg:max-h-[100vh] overflow-auto'>
            <div className='flex mb-5 gap-2 sm:gap-6 flex-col sm:flex-row'>
                <div onClick={handleShow} className='relative mx-auto group overflow-hidden min-w-[170px] md:min-w-[200px] rounded-lg'>
                    <OverlayImage>
                        <svg data-v-20f285ec="" data-v-fd73eeec="" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff" className="xLarge icon"><path data-v-20f285ec="" fill="currentColor" d="m9.5 13.09 1.41 1.41-4.5 4.5H10v2H3v-7h2v3.59l4.5-4.5m1.41-3.59L9.5 10.91 5 6.41V10H3V3h7v2H6.41l4.5 4.5m3.59 3.59 4.5 4.5V14h2v7h-7v-2h3.59l-4.5-4.5 1.41-1.41M13.09 9.5l4.5-4.5H14V3h7v7h-2V6.41l-4.5 4.5-1.41-1.41Z"></path></svg>
                    </OverlayImage>
                    <ReadImage
                        className='min-w-[170px] max-w-[170px] h-[270px] md:h-[315px] md:min-w-[200px] md:max-w-[200px] object-cover mx-auto duration-[0ms]'
                        src={info.cover}
                        className2='bg-gray-400 mx-auto max-h-[270px] w-[170px] md:w-[200px] md:max-h-[315px] h-[22rem]'
                        icon={BsFillImageFill}
                        className3='text-gray-600 w-7 h-7 sm:w-9 sm:h-9 animate-pulse'
                    />
                </div>
                <Modal isOpen={showModal} onClose={handleHide} className='bg-root bg-opacity-[.95]'>
                    <img className='fixed top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 h-[80%] z-50 object-contain' src={info.cover} alt="Modal Image" />
                </Modal>
                <div className='info gap-2 flex flex-col w-full'>
                    <h1 className=' font-bold text-3xl text-white text-center sm:text-left'>{info.title}</h1>
                    <p className='text-white text-lg font-semibold'>Author: <span className='text-gray-300'>{info.author}</span></p>
                    <p className='text-white text-lg font-semibold'>Status: <span className='text-green-400'>{info.status}</span></p>
                    <p className='text-white text-lg font-semibold'>Server: <span className='text-white'>{select.source}</span></p>
                    <FollowIcon
                        iconSize={30}
                        iconClassName='text-red-400 md:hover:scale-125 transition hidden lg:block'
                        cb={follow ? removeFollow : addFollow}
                        icon={follow ? BsSuitHeartFill : FaRegHeart}
                        title='Bookmark'
                    />
                    {/* <p>Thể loại: {info.genres.join(", ")}</p> */}
                    {info.chapters.length > 0 && <div className='my-2 flex items-center'>
                        <Link
                            as={`/manga/${slug}/${info.chapters.slice(-1)[0].chap}`}
                            href={{
                                pathname: `/manga/${slug}/${info.chapters.slice(-1)[0].chap}`,
                                query: { id: info.chapters.slice(-1)[0].id, source: select.source, type: select.type, cover: info.cover },
                            }}
                        >
                            <a className='text-white mr-4 bg-link pr-2 py-1 pl-4 rounded-full hover:bg-link-hover text-2xl font-bold transition duration-300'>READ<FaChevronRight className='inline mb-[0.3rem]' /></a>
                        </Link>
                        <Link
                            as={`/manga/${slug}/${info.chapters[0].chap}`}
                            href={{
                                pathname: `/manga/${slug}/${info.chapters[0].chap}`,
                                query: { id: info.chapters[0].id, source: select.source, type: select.type, cover: info.cover },
                            }}
                        >
                            <a className='text-white text-xl bg-yellow-500/[.8] h-[42px] min-w-[42px] px-2 flex items-center justify-center rounded-full hover:bg-yellow-500 duration-300 font-bold'>{info.chapters[0].nameIndex}</a>
                        </Link>
                        <FollowIcon
                            iconSize={30}
                            iconClassName='text-red-400 md:hover:scale-125 transition ml-auto lg:hidden'
                            cb={follow ? removeFollow : addFollow}
                            icon={follow ? BsSuitHeartFill : FaRegHeart}
                            title='Bookmark'
                        />
                    </div>}
                </div>
            </div>
            <h1 className='text-2xl text-white font-bold border-l-[5px] border-red-400 pl-2 mb-3'>Summary</h1>
            <p className=' break-words text-justify text-white'>{info.desc.replace(regexMatchMultiString, 'MangaMAX')}</p>
            <div className='mt-4'>
                {info.genres.map((item: any, index: number) => (
                    <p key={index} className='inline-block bg-gray-700 mr-2 px-4 py-[5px] rounded-full mb-2 text-white'>{item}</p>
                ))}
            </div>
        </div>
    );
};

export default LeftComic;