import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const RecentsComponent = dynamic(() => import('components/Recents'), {
    loading: () => <Loader />,
});

const Recents: NextPage = () => (
    <RecentsComponent />
);

export default Recents;