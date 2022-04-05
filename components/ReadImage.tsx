import React, { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';

const ReadImage: React.FC<any> = ({ src, opacity, icon: Icon, ...props }) => {
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
        <>
            {
                !loaded && <div className={"flex flex-col items-center justify-center w-full " + props.className2}>
                    <Icon className={`${props.className3}`} />
                    <p className={`animate-pulse mt-1 ${!props.textIcon && 'hidden'}`}>{props.textIcon}</p>
                </div>
            }
            <img
                alt="Đọc truyện tại MangaMAX"
                src={src}
                className={props.className + (loaded ? '' : ' opacity-0 !h-0')}
                loading='lazy'
            />
        </>
    );
};

export default ReadImage;