import { NextPage } from 'next';
import RecentsComponent from '@/components/Recents';
import Head from 'next/head';

const Recents: NextPage = () => (
    <>
        <Head>
            <title>History</title>
        </Head>
        <RecentsComponent />
    </>
);

export default Recents;