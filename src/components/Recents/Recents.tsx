import getRecents from '@/hooks/useRecents';
import { FC, useEffect } from 'react';
import { handleSource } from '@/store/action';
import TypeRender from '../Shared/TypeRender';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Grid from '../Home/Grid';

const RecentsComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { reducer: select } = useAppSelector(state => state);

    useEffect(() => {
        dispatch(handleSource(select.source, 'recents'));
    }, []);

    return (
        <Grid
            typeRender={() => TypeRender('Recents')}
            fetch={getRecents}
        />
    );
};

export default RecentsComponent;