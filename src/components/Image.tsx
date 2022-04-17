import React, { useCallback, useEffect, useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [src])

  return (
    <img
      className={`${className} ${isLoaded ? '' : ' opacity-0'}`}
      src={src}
      alt={alt}
      onLoad={handleLoadingComplete}
    />
  );
};

export default Image;
