import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { handleSource } from 'store/action';
import TypeRender from './TypeRender';
import Grid from './Grid';
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import getBookmarks from 'hooks/getBookmarks';

const BookmarksComponent: NextPage = () => {
    const { reducer4: { user } } = useAppSelector(state => state);
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const select = useAppSelector(state => state.reducer);

    useEffect(() => {
        if (!user) {
            dispatch(handleSource(select.source, 'latest'));
            navigate.push("/login");
        } else {
            dispatch(handleSource(select.source, 'bookmarks'));
        };
    }, [user]);

    return (
        <Grid
            typeRender={() => TypeRender('Bookmarks')}
            fetch={getBookmarks}
            user={user}
        />
    );
};

export default BookmarksComponent;




