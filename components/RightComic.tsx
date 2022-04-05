
import { RiSortDesc } from 'react-icons/ri';
import { CgDisplayGrid } from 'react-icons/cg';
import List from './List';
import dynamic from 'next/dynamic';
const Index = dynamic(() => import('./Index'));

const RightComic = ({ dt, handleSort, slug, select, handleChapter, reducer3, cover }: any) => (
    <div className='chapters lg:w-[40%]'>
        <div className='py-1 mb-1 hidden lg:block sticky bg-primary top-0 text-white text-xl font-bold'>
            <h1 className='inline text-2xl border-l-[5px] border-red-400 pl-2'>Chapters</h1>
            <RiSortDesc title='Sort' onClick={() => handleSort()} className=' mx-2 float-right hover:brightness-75' size={30} />
            <div className='float-right border h-[31px] bg-white'></div>
            <CgDisplayGrid title='List | Index' onClick={() => handleChapter()} className='float-right hover:brightness-75 mx-2' size={30} />
        </div>
        <ul className='overflow-y-scroll max-h-[80vh] -mr-[6px]'>
            {reducer3.indexChapters ? (
                <Index
                    select={select}
                    dt={dt}
                    slug={slug}
                    cover={cover}
                />
            ) : (
                <List
                    select={select}
                    dt={dt}
                    slug={slug}
                    cover={cover}
                />
            )}
        </ul>
    </div>
);

export default RightComic;