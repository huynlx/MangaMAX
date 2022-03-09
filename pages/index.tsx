import type { NextPage } from 'next'
import Grid from '../components/Grid'
import { GridProps } from '../shared/types';

const Home: NextPage<GridProps> = () => {

  return (
    <Grid />
  )
}

export default Home