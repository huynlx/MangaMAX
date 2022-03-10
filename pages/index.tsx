import type { NextPage } from 'next'
import { memo } from 'react';
import Grid from '../components/Grid'
import { GridProps } from '../shared/types';

const Home: NextPage<GridProps> = () => {

  return (
    <Grid />
  )
}

export default memo(Home)