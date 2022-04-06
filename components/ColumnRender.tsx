import ComicCard from 'components/ComicCard';

const ColumnRender = ({ colRendered, select }: any) => (
    <div className='col flex flex-col gap-2'>
        {colRendered.map((item: any, index: any) =>
            <ComicCard
                item={item}
                key={index}
                select={select}
            />
        )}
    </div>
);

export default ColumnRender;