import ComicCard from "./ComicCard";

const ColumnRender = ({ colRendered }: any) => (
    <div className='col flex flex-col gap-2'>
        {colRendered.map((item: any, index: any) =>
            <ComicCard
                item={item}
                key={index}
            />
        )}
    </div>
);

export default ColumnRender;