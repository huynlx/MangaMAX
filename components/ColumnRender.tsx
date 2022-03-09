import React from 'react';
import Comic from './Comic';

const ColumnRender = ({ colRendered, select }: any) => (
    <div className='col flex flex-col gap-2'>
        {colRendered.map((item: any, index: any) => (
            <Comic
                item={item}
                key={index}
                select={select} />
        ))}
    </div>
);

export default ColumnRender;