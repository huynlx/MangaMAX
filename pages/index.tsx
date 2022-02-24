import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import getHome from '../shared/api/home'
import styles from '../styles/Home.module.css'


const Home: NextPage<any> = ({ data }) => {

  return (
    <div>
      <main className=' px-[5vw]'>
        {
          data.map((section: any) => (
            <Fragment key={section.name}>
              <h1 className='text-2xl font-semibold my-5'>{section.name}</h1>
              <div className='grid gap-2' style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gridAutoRows: "1fr",
              }}>
                {
                  section.items.map((item: any) => (
                    <Link href={`/comic/${item.slug}`} key={item.slug}>
                      <a className='flex flex-col items-stretch'>
                        <div className='w-full h-0 pb-[150%] relative flex-grow'>
                          <img src={item.cover} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                        </div>
                        <h1 className=' max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.title}</h1>
                        <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden  text-center flex-shrink-0'>{item.chapter}</p>
                      </a>
                    </Link>
                  ))
                }
              </div>
            </Fragment>
          ))
        }
      </main>
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
