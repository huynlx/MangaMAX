import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { BsFillImageFill } from "react-icons/bs";

const ReadImage: NextPage<any> = ({ src, opacity, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src])

    return (
        <>
            {
                !loaded && <div className="flex items-center justify-center w-full h-[22rem] text-gray-500">
                    <BsFillImageFill className="w-8 h-8 animate-pulse" />
                </div>
            }
            <img
                alt="Đọc truyện tại MangaMAX"
                src={src}
                onLoad={() => {
                    setLoaded(true);
                }}
                onError={() => {
                    setLoaded(true);
                }}
                className={props.className + (loaded ? ' transition-opacity h-auto' : ' h-0')}
                style={{ opacity: loaded ? opacity : 0 }}
            />
        </>
    );
};

export default ReadImage;