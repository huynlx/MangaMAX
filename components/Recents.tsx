import getRecents from 'hooks/getRecents';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSource } from 'store/action';
import Grid from './Grid';
import TypeRender from './TypeRender';

const RecentsComponent = () => {
    const dispatch = useDispatch();
    const select: any = useSelector((state: any) => state.reducer);

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