import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { layout } from '@/store/action';
import React from 'react';
import { BsGrid1X2 } from 'react-icons/bs';
import { IoGridOutline } from 'react-icons/io5';

const DisplayOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reducer4: { layout: typeLayout } } = useAppSelector(state => state);

  return (
    <div className='flex gap-3'>
      <h1 className='text-gray-400 text-sm self-center hidden sm:block'>Display options:</h1>
      <div className='options flex gap-2'>
        <span
          title='Waterfall Layout'
          className={`p-2 pt-[10px] bg-[hsla(0,0%,100%,.16)] rounded-4 text-white ${typeLayout === 0 && 'opacity-40 hover:opacity-60 duration-200'}`}
          onClick={() => dispatch(layout(1))}>
          <BsGrid1X2 size={24} />
        </span>
        <span
          title='Simple Layout'
          className={`p-2 bg-[hsla(0,0%,100%,.16)] rounded-4 text-white ${typeLayout === 1 && 'opacity-40 hover:opacity-60 duration-200'}`}
          onClick={() => dispatch(layout(0))}>
          <IoGridOutline size={28} />
        </span>
      </div>
    </div >
  );
};

export default DisplayOptions;