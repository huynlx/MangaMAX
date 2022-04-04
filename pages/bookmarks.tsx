import { NextPage } from 'next';
import BookmarksComponent from 'components/Bookmarks';
import Head from 'next/head';

const Bookmarks: NextPage = () => (
    <>
        <Head>
            <title>Bookmarks</title>
        </Head>
        <BookmarksComponent />
    </>
);

export default Bookmarks;