import { NextPage } from 'next';
import RecentsComponent from '@/components/Recents';
import Head from '@/components/Head';

const Recents: NextPage = () => (
    <>
        <Head title='History' />
        <RecentsComponent />
    </>
);

export default Recents;