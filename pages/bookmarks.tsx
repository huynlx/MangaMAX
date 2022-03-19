import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const BookmarksComponent = dynamic(() => import('components/Bookmarks'), {
    loading: () => <Loader />,
});

const Bookmarks: NextPage = () => (
    <BookmarksComponent />
);

export default Bookmarks;