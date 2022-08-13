import { RiSortDesc } from 'react-icons/ri';
import { CgDisplayGrid } from 'react-icons/cg';
import Index from './Index';
import List from './List';
import { useAppSelector } from '@/hooks/useRedux';
import { ImSpinner8 } from 'react-icons/im';

const RightComic = ({ chapters, handleSort, slug, handleChapter, source }: any) => {
    const { reducer3 } = useAppSelector(state => state);

    return (
        <div className='chapters lg:w-[40%]'>
            <div className='py-1 mb-1 hidden lg:block sticky bg-primary top-0 text-white text-xl font-bold'>
                <h1 className='inline text-xl border-l-[5px] border-red-400 pl-2'>Chapters</h1>
                <RiSortDesc title='Sort' onClick={() => handleSort()} className=' mx-2 float-right hover:brightness-75' size={30} />
                <div className='float-right border h-[31px] bg-white'></div>
                <CgDisplayGrid title='List | Index' onClick={() => handleChapter()} className='float-right hover:brightness-75 mx-2' size={30} />
            </div>
            <ul className='overflow-y-scroll h-full max-h-[80vh] -mr-[6px]'>
                {
                    !chapters ?
                        <div className='flex justify-center gap-[7px] pr-2 h-full'>
                            <ImSpinner8 className='animate-spin absolute top-[45%]' size={60} />
                        </div>
                        :
                        reducer3.indexChapters ? (
                            <Index
                                chapters={chapters}
                                slug={slug}
                                source={source}
                            />
                        ) : (
                            <List
                                chapters={chapters}
                                slug={slug}
                                source={source}
                            />
                        )
                }
            </ul>
        </div>
    );
};

export default RightComic;