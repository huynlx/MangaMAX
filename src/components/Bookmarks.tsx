import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { handleSource } from '@/store/action';
import TypeRender from '@/components/TypeRender';
import Grid from '@/components/Grid';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import getBookmarks from '@/hooks/getBookmarks';

const BookmarksComponent: NextPage = () => {
    const { reducer4: { user }, reducer: select } = useAppSelector(state => state);
    const navigate = useRouter();
    const dispatch = useAppDispatch();

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




