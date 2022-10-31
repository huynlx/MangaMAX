import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { handleSource } from '@/store/action';
import TypeRender from '@/components/Shared/TypeRender';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import getBookmarks from '@/hooks/useGetBookmarks';
import Grid from '../Home/Grid';

const BookmarksComponent: FC = () => {
    const { reducer4: { user, bookmarks }, reducer: select } = useAppSelector(state => state);
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
            typeRender={() => TypeRender('Bookmarks', bookmarks.length)}
            fetch={getBookmarks}
            user={user}
        />
    );
};

export default BookmarksComponent;




