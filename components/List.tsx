import Link from 'next/link';

const List = ({ select, slug, dt, source }: any) => {
    return dt.chapters.map((item: any) => (
        <Link
            as={`/manga/${slug}/${item.chap}`}
            key={item.id}
            href={{
                pathname: `/manga/${slug}/${item.chap}`,
                query: {
                    id: item.id,
                    source: source,
                }
            }}
        >
            <a className='border-gray-700 text-white lg:pr-[10px] pb-2 lg:border-0 border-b flex justify-between hover:text-yellow-500 visited:text-yellow-500'>
                <span className='transition duration-150 w-[75%] text-left'><b className='text-link'>{item.nameIndex + '.'}</b>  {item.name}</span>
                <span className='text-gray-400 w-[25%] text-right'>{item.updateAt}</span>
                {/* <span className='text-gray-400 w-[17%] text-sm text-right hidden sm:block self-start leading-[1.88]'>{item.view}</span> */}
            </a>
        </Link>
    ))
};

export default List;