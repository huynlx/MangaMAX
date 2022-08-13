import { FC, PropsWithChildren } from 'react';

const OverlayImage: FC<PropsWithChildren> = ({ children }) => (
  <div className="absolute -inset-1 bg-black bg-opacity-60 backdrop-blur-sm items-center flex-col gap-2 justify-center z-[5] group-hover:opacity-100 group-hover:visible flex duration-200 opacity-0 invisible text-white text-center text-base">
    {children}
  </div>
);

export default OverlayImage;