import React from 'react';
import Comic from './Comic';

const ColumnRender = ({ colRendered, keyProp, content, select }: any) => {
    return (
        <div className='col flex flex-col gap-2'>
            {
                colRendered.map((item: any, index: any) => (
                    <Comic
                        item={item}
                        key={index}
                        select={select} />
                ))
            }
        </div>
    );
};

export default ColumnRender;