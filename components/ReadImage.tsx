import React, { useCallback, useEffect, useState } from 'react';
import { BsFillImageFill } from "react-icons/bs";
import { useIsMounted } from 'hooks/useIsMounted';

const ReadImage = ({ src, opacity, ...props }: any) => {
    const [loaded, setLoaded] = useState(false);
    const isMounted = useIsMounted();

    const loadImage = useCallback(async (image: string) => {
        return new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = image;
            loadImg.onload = () => resolve(image);
            loadImg.onerror = (err) => reject(err);
        }).then(() => {
            if (!isMounted.current) return null  //fix unmounted => cause component is dismounted before async complete
            setLoaded(true);
        }).catch((err) => {
            if (!isMounted.current) return null
            setLoaded(true);
        });
    }, []) //useRef thì ko cần thêm vào deps, props or state thì mới thêm

    useEffect(() => {
        setLoaded(false);
        loadImage(src);
    }, [src])

    return (
        <div className='cover'>
            {
                !loaded && <div className={"flex items-center justify-center w-full h-[22rem] text-gray-500 " + props.className2}>
                    <BsFillImageFill className="w-9 h-9 animate-pulse" />
                </div>
            }
            <img
                alt="Đọc truyện tại MangaMAX"
                src={src}
                className={props.className + (loaded ? '' : ' opacity-0 !h-0')}
                loading='lazy'
            />
        </div>
    );
};

export default ReadImage;