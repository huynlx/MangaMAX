import Router from 'next/router';
import { FaChevronLeft } from 'react-icons/fa';
import { del_recents, handleSource } from '@/store/action';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ImBin } from 'react-icons/im';

const TypeRender = (type: string, quantity?: number) => {
    const dispatch = useAppDispatch();
    const { reducer: select } = useAppSelector(state => state);

    return (
        <h1 className={`w-full font-bold text-white sm:text-4xl text-3xl`}>
            <span>{type} {quantity && `(${quantity})`}</span>
            {
                type === 'Recents' && <ImBin title='Clear All' onClick={() => dispatch(del_recents())} className='inline mb-[6px] ml-2 hover:text-red-500 transition' size={25} />
            }

            <span
                onClick={() => { dispatch(handleSource(select.source, 'latest')); Router.push(`/`); }}
                className='float-right flex items-center text-gray-300 hover:text-white transition gap-1 mt-[5px]'
            >
                <FaChevronLeft className='icon w-[.65rem]' />
                <span className="text-lg sm:text-lg font-semibold cursor-pointer">Back</span>
            </span>
        </h1 >
    );
};

export default TypeRender;