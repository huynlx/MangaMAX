import getRecents from '@/hooks/getRecents';
import { FC, useEffect } from 'react';
import { handleSource } from '@/store/action';
import Grid from './Grid';
import TypeRender from './TypeRender';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const RecentsComponent:FC = () => {
    const dispatch = useAppDispatch();
    const { reducer: select } = useAppSelector(state => state);

    useEffect(() => {
        dispatch(handleSource(select.source, 'recents'));
    }, [])

    return (
        <Grid
            typeRender={() => TypeRender('Recents')}
            fetch={getRecents}
        />
    );
};

export default RecentsComponent;