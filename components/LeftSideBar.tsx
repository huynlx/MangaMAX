import { useDispatch, useSelector } from 'react-redux';
import { SOURCES } from 'shared/constants';
import Router from 'next/router';
import { handleSource, setScroll } from 'store/action';

const LeftSideBar = ({ id, closeNav }: any) => {
  const select: any = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();

  return (
    <div id={id} className='sidenav z-20'>
      <div><p className="closebtn" onClick={closeNav}>×</p></div>
      {SOURCES.map((item: any) => (
        <div key={item.source} onClick={() => {
          dispatch(handleSource(item.source, 'latest'));
          dispatch(setScroll(0));
          Router.push('/');
        }}>
          <p className={`text-center ${select.source == item.source && '!text-white !text-3xl'}`}>{item.name}</p>
        </div>
      ))}
      <style jsx>{`
                .sidenav {
                    height: 100%;
                    width: 250px;
                    position: fixed;
                    top: 0;
                    left: -250px;
                    background-color: #111;
                    overflow-x: hidden;
                    transition: 0.2s ease-out;
                    padding-top: 60px;
                  }
                  
                  .sidenav p {
                    text-decoration: none;
                    font-size: 25px;
                    color: #818181;
                    display: block;
                    transition: 0.3s;
                  }
                  
                  .sidenav p:hover {
                    color: #f1f1f1;
                  }
                  
                  .sidenav .closebtn {
                    position: absolute;
                    top: 0;
                    right: 25px;
                    font-size: 36px;
                    margin-left: 50px;
                  }
                  
                  @media screen and (max-height: 450px) {
                    .sidenav {
                      padding-top: 15px;
                    }
                    .sidenav a {
                      font-size: 18px;
                    }
                  }                  
            `}</style>
    </div>
  );
};

export default LeftSideBar;