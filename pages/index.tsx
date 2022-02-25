import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const data = await getHome(+query.page!);
    return {
      props: {
        data,
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