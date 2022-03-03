import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { BsFillImageFill } from "react-icons/bs";

const ReadImage: NextPage<any> = ({ src, opacity, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        const loadImage = (image: any) => {
            return new Promise((resolve, reject) => {
                const loadImg = new Image();
                loadImg.src = image;
                loadImg.onload = () => resolve(image);
                loadImg.onerror = (err) => reject(err); //call catch()
            });
        };
        loadImage(src).then(() => setLoaded(true)).catch((err) => console.log(err));
    }, [src])

    return (
        <>
            {
                !loaded && <div className={"flex items-center justify-center w-full h-[22rem] text-gray-500 " + props.className2}>
                    <BsFillImageFill className="w-9 h-9 animate-pulse" />
                </div>
            }
            <img
                alt="Đọc truyện tại MangaMAX"
                src={src}
                onError={() => {
                    setLoaded(true);
                }}
                className={props.className + (loaded ? ' transition-opacity' : ' h-0')}
                style={{ opacity: loaded ? opacity : 0 }}
            />
        </>
    );
};

export default ReadImage;