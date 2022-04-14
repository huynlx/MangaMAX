import { NextPage } from 'next';
import BookmarksComponent from '@/components/Bookmarks';
import Head from '@/components/Head';

const Bookmarks: NextPage = () => (
    <>
        <Head title='Bookmarks' />
        <BookmarksComponent />
    </>
);

export default Bookmarks;