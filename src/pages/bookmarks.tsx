import { NextPage } from 'next';
import BookmarksComponent from '@/components/Bookmarks/Bookmarks';
import Head from '@/components/Shared/Head';

const Bookmarks: NextPage = () => (
    <>
        <Head title='Bookmarks' />
        <BookmarksComponent />
    </>
);

export default Bookmarks;