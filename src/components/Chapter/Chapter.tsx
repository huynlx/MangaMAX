import React, { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from "@/hooks/useRedux";
import Head from '../Shared/Head';
import { CgArrowsHAlt, CgArrowsShrinkH, CgMaximizeAlt } from 'react-icons/cg';
import SideLeft from './SideLeft';
import SideRight from './SideRight';

interface viewProps {
    [key: string]: boolean | undefined
}

const ChapterComponent = (props: any) => {
    const [width, setWidth] = useState<boolean>(true);
    const [view, setView] = useState<viewProps>({
        fit: false,
        maxWidth: false,
        natural: true,
    })
    const [direction, setDirection] = useState();

    const { chapter, comicSlug, selectedIndex, chapterId } = props;
    const { reducer: select, reducer5: { chapters, id, index } } = useAppSelector(state => state);

    const router = useRouter();

    const nextChapter = useCallback(() => { //lưu filterChap ở sideLeft vào store rồi lấy ra, ko dùng cả chapters nữa
        router.push({
            pathname: `/manga/${comicSlug}/${chapters[index - 1].chap}`,
            query: { id: chapters[index - 1].id, source: chapters[0].source }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicSlug, chapters, index, router, select.source, select.type]);

    const checkView = () => {
        const keys = Object.keys(view);
        const [filtered] = keys.filter(function (key) {
            return view[key];
        });

        switch (filtered) {
            case 'fit':
                return {
                    mode: 'fit',
                    className: 'w-full lg:min-w-[50vw] lg:max-w-[55vw]',
                    icon: CgArrowsShrinkH
                };
            case 'maxWidth':
                return {
                    mode: 'maxWidth',
                    className: 'w-full',
                    icon: CgArrowsHAlt
                };
            case 'natural':
                return {
                    mode: 'natural',
                    className: 'w-auto',
                    icon: CgMaximizeAlt
                };
        }
    }

    return (
        <>
            {
                chapter.title && <Head title={chapter?.title + " (" + chapter.chapterCurrent?.replace('- ', '') + ")"} />
            }
            <div className='bg-[#0d0d0d] w-full'>
                <SideLeft
                    {...props}
                    setWidth={() => setWidth(!width)}
                    width={width}
                    chapters={chapter.chapters}
                    source={chapter.source}
                    setView={(v: any) => setView(v)}
                    view={checkView()}
                />

                {
                    !width &&
                    <div className='fixed z-10'>
                        <div
                            className='bug'
                            onClick={() => setWidth(!width)}
                        >
                            <span data-v-6b3fd699="" className="hidden lg:flex pointer-events-none items-center justify-center font-medium select-none">
                                <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path data-v-20f285ec="" d="M3 12h12M3 6h18M3 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <style jsx>
                                {`
                                    .bug{
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        border-color: #fff transparent transparent #fff;
                                        border-style: solid;
                                        border-width: 3rem;
                                        opacity: .3;
                                        cursor: pointer;
                                        transition: opacity .2s;
                                    }
    
                                    .bug:hover{
                                        opacity: 1;
                                    }
    
                                    .bug>*[data-v-6b3fd699] {
                                        position: absolute;
                                        right: -0.55rem;
                                        top: -1.25rem;
                                        transform: translate(-50%,-50%);
                                        --tw-text-opacity: 1;
                                        color: rgba(0, 0, 0, var(--tw-text-opacity));
                                    }
                                `}
                            </style>
                        </div>
                    </div>
                }

                <SideRight
                    {...props}
                    index={index}
                    nextChap={nextChapter}
                    select={select}
                    width={width}
                    view={checkView()}
                />
            </div>
        </>
    );
};

export default memo(ChapterComponent);
