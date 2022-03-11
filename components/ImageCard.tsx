//for home page
import { NextPage } from 'next';
import React from 'react';
import { BsFillImageFill } from 'react-icons/bs';

const ImageCard: NextPage<any> = ({ src, opacity, visible, comicRef, color, ...props }) => {

    return (
        <>
            <img
                alt="Đọc truyện tại MangaMAX"
                src={src}
                className={props.className + (visible ? ' ' : ' !h-0')}
                style={{ opacity: visible ? opacity : 0 }}
            />
            {
                !visible && <div ref={comicRef} className={"flex items-center justify-center w-full h-[22rem] text-gray-500 " + props.className2}>
                    <BsFillImageFill className="w-9 h-9 animate-pulse" />
                </div>
            }
        </>
    );
};

export default ImageCard;