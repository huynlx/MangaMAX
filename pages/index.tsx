import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import getHome from '../shared/api/home'
import styles from '../styles/Home.module.css'
import Grid from '../components/Grid'


const Home: NextPage<any> = ({ data }) => {

  return (
    <div>
      <Grid data={data} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHome();
    return {
      props: {
        data,
      },
      revalidate: 120
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home
