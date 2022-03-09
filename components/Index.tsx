import Link from 'next/link';
import React from 'react';

const Index = ({ dt, slug, select }: any) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {
                dt.chapters.map((item: any, index: number) => (
                    <Link key={item.id} href={{
                        pathname: `/comic/${slug}/${item.chap}`,
                        query: { id: item.id, source: select.source, type: select.type }
                    }}>
                        <a title={item.name} className='text-white border-gray-800 bg-gray-800 w-16 h-9 rounded-lg lg:border border-b flex items-center justify-center hover:text-link visited:text-link visited:hover:text-link-hover'>
                            <span className='transition duration-150 w-auto sm:w-[auto] text-center'>{item.nameIndex}</span>
                        </a>
                    </Link>
                ))
            }
        </div>
    );
};

export default Index;