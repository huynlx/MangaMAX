import { SOURCES } from 'constants/index';
import Router from 'next/router';
import { handleSource } from 'store/action';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { usePosition } from 'hooks/usePosition';
import { SidebarProps } from 'shared/types';
import { FC } from 'react';

const LeftSideBar: FC<SidebarProps> = ({ id, closeNav }: any) => {
  const { reducer: select } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { handlePosition } = usePosition();

  return (
    <div id={id} className='sidenav z-20' style={{ "left": "-250px" }}>
      {SOURCES.map((item: any) => (
        <div key={item.source} onClick={() => {
          dispatch(handleSource(item.source, 'latest'));
          handlePosition(0);
          Router.push('/');
          closeNav();
        }}>
          <p className={`text-center ${select.source == item.source && '!text-white !text-3xl'}`}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftSideBar;