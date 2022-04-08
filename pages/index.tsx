import type { NextPage } from 'next'
import { memo } from 'react';
import Grid from 'components/Grid'
import { GridProps } from 'shared/types';
import useFetchHome from 'hooks/useFetchHome';
import { handleSource } from 'store/action';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { capitalizeFirstLetter } from 'shared/capitalizeFirstLetter';

const Home: NextPage<GridProps> = () => {
  const dispatch = useAppDispatch();
  const { reducer: select } = useAppSelector((state) => state);

  const typeRender = () => (
    <h1
      className={`text-white sm:text-3xl text-2xl font-bold`}
      onClick={() => {
        dispatch(handleSource(select.source, select.type))
      }}
    >
      {capitalizeFirstLetter(select.type)}
    </h1>
  )

  return (
    <Grid
      fetch={useFetchHome}
      typeRender={typeRender}
    />
  )
}

export default memo(Home)