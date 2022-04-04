import Link from 'next/link';


const Index = ({ dt, slug, select }: any) => (
    <div className='flex flex-wrap gap-2'>
        {dt.chapters.map((item: any, index: number) => (
            <Link key={item.id} as={`/manga/${slug}/${item.chap}`} href={{
                pathname: `/manga/${slug}/${item.chap}`,
                query: { id: item.id, source: select.source, type: select.type }
            }}>
                <a title={item.name} className='text-link border-transparent transition bg-chapter w-[4.1rem] h-9 rounded-lg lg:border border-b flex items-center justify-center hover:text-white hover:bg-link visited:text-white visited:bg-link'>
                    <span className='w-auto sm:w-[auto] text-center font-semibold'>{item.nameIndex}</span>
                </a>
            </Link>
        ))}
    </div>
);

export default Index;