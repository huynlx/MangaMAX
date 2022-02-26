import type { GetServerSideProps, NextPage } from 'next'
import getHome from '../shared/api/home'
import Grid from '../components/Grid'


const Home: NextPage<any> = ({ data, page }) => {

  return (
    <Grid data={data} page={page} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const data = await getHome(+query.page!);
    return {
      props: {
        data,
        page: +query.page!
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home