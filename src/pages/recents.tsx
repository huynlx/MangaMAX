import { NextPage } from 'next';
import RecentsComponent from '@/components/Recents/Recents';
import Head from '@/components/Shared/Head';

const Recents: NextPage = () => (
    <>
        <Head title='History' />
        <RecentsComponent />
    </>
);

export default Recents;