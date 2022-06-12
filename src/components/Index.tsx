import Link from 'next/link';

const Index = ({ chapters, slug, source }: any) => ( //chapters
    <div className='grid grid-cols-chapter gap-[7px] pr-2'>
        {chapters.map((item: any) => (
            <Link
                key={item.id}
                // as={`/manga/${slug}/${item.chap}`}
                href={{
                    pathname: `/manga/${slug}/${item.chap}`,
                    query: { id: item.id, source }
                }}>
                <a title={item.name} className='text-link border-transparent transition bg-chapter w-auto h-9 rounded-lg lg:border border-b flex items-center justify-center hover:text-white hover:bg-link visited:text-white visited:bg-link'>
                    <span className='w-auto sm:w-[auto] text-center font-semibold'>{item.nameIndex}</span>
                </a>
            </Link>
        ))}
    </div>
);

export default Index;