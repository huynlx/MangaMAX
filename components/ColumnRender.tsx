import React from 'react';
import ComicCard from './ComicCard';

const ColumnRender = ({ colRendered, select }: any) => {

    return (
        <div className='col flex flex-col gap-2'>
            {colRendered.map((item: any, index: any) => {

                return <ComicCard
                    item={item}
                    key={index}
                    select={select}
                />
            })}
        </div>
    );
};

export default ColumnRender;