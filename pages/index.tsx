import type { NextPage } from 'next'
import { memo } from 'react';
import Grid from '../components/Grid'
import { GridProps } from '../shared/types';
import useFetchHome from 'hooks/useFetchHome';
import { handleSource } from 'store/action';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

const Home: NextPage<GridProps> = () => {
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.reducer);

  const typeRender = () => (
    <>
      <h1
        className={`${select.type === 'latest' ? 'text-white sm:text-3xl text-2xl font-bold ' : 'sm:text-2xl text-xl brightness-75 font-semibold'}`}
        onClick={() => {
          dispatch(handleSource(select.source, 'latest'))
        }}
      >
        Latest
      </h1>
      <h1
        className={`${select.type === 'browse' ? 'text-white sm:text-3xl text-2xl font-bold ' : 'sm:text-2xl text-xl brightness-75 font-semibold mt-1'}`}
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