import React, { useLayoutEffect, useState } from 'react';

interface ReadImageProps {
    src: string,
    opacity?: number,
    icon?: React.ComponentType<{ className: string; }>;
    className?: string,
    className2?: string,
    className3?: string,
    textIcon?: string,
    alt: string;
}

const ReadImage: React.FC<ReadImageProps> = ({ src, opacity, icon: Icon, alt, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        setLoaded(false);
    }, [src]);

    return (
        <>
            {
                !loaded && <div className={"flex flex-col items-center justify-center w-full " + props.className2}>
                    {
                        Icon && <Icon className={`${props.className3}`} />
                    }
                    {
                        props.textIcon && <p className={`animate-pulse mt-1`}>{props.textIcon}</p>
                    }
                </div>
            }
            <img
                alt={alt}
                src={src}
                onLoad={() => setLoaded(true)}
                onError={(e) => e.currentTarget.src = '/_next/image?url=/onError.png&w=720&q=75'}
                className={props.className + (loaded ? '' : ' opacity-0 !h-0')}
                loading="lazy"
            />
        </>
    );
};

export default ReadImage;