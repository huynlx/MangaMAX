import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import { handleSource } from 'store/action';
import useFetchBookmarks from 'hooks/useFetchBookmarks';
import TypeRender from './TypeRender';
import Grid from './Grid';

const BookmarksComponent: NextPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useRouter();
    const dispatch = useDispatch();
    const select: any = useSelector((state: any) => state.reducer);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            dispatch(handleSource(select.source, 'latest'));
            navigate.push("/login");
        } else {
            dispatch(handleSource(select.source, 'bookmarks'));
        };
    }, [user, loading]);

    return (
        <Grid
            typeRender={() => TypeRender('Bookmarks')}
            fetch={useFetchBookmarks}
            user={user}
        />
    );
};

export default BookmarksComponent;




