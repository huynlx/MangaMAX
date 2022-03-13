import { useDispatch, useSelector } from 'react-redux';
import { SOURCES } from 'shared/constants';
import Router from 'next/router';
import { handleSource } from 'store/action';

const LeftSideBar = ({ id, closeNav }: any) => {
    const select: any = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();

    return (
        <div id={id} className='sidenav z-20'>
            <div><p className="closebtn" onClick={closeNav}>×</p></div>
            {SOURCES.map((item: any) => (
                <div key={item.source} onClick={() => {
                    dispatch(handleSource(item.source, 'latest'));
                    dispatch({ type: 'SCROLL_POSITION', payload: { scrollPosition: 0 } });
                    Router.push('/');
                }}>
                    <p className={`text-center ${select.source == item.source && '!text-white !text-3xl'}`}>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default LeftSideBar;