import type { NextPage } from 'next'
import { memo } from 'react';
import Grid from '../components/Grid'
import { GridProps } from '../shared/types';
import useFetchHome from 'hooks/useFetchHome';
import { useDispatch, useSelector } from 'react-redux';
import { handleSource } from 'store/action';

const Home: NextPage<GridProps> = () => {
  const dispatch = useDispatch();
  const select: any = useSelector((state: any) => state.reducer);

  const typeRender = () => (
    <>
      <h1
        className={`font-semibold ${select.type === 'latest' ? 'text-white text-3xl' : 'text-2xl brightness-75'}`}
        onClick={() => {
          dispatch(handleSource(select.source, 'latest'))
        }}
      >
        Latest
      </h1>
      <h1
        className={`font-semibold ${select.type === 'browse' ? 'text-white text-3xl' : 'text-2xl brightness-75'}`}
        onClick={() => {
          dispatch(handleSource(select.source, 'browse'))
        }}
      >
        Browse
      </h1>
    </>
  )

  return (
    <Grid fetch={useFetchHome} typeRender={typeRender} />
  )
}

export default memo(Home)