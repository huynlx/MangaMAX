import React, { useEffect, useMemo, useState } from "react";
import { setData } from "@/utils/setData";
import { setCol } from "@/utils/setData";
import Loader from "@/components/Loading/Loader";
import ColumnRender from "@/components/Home/ColumnRender";
import dynamic from "next/dynamic";
const LoadMore = dynamic(() => import("@/components/Loading/LoadMore"));
import { User } from "firebase/auth";
import { useAppSelector } from "@/hooks/useRedux";
import { usePosition } from "@/hooks/usePosition";
import ComicCard from "./ComicCard";

interface GridProps {
  keyword?: string;
  fetch?: (props: any) => any;
  typeRender: React.ComponentType<{}>;
  user?: User | null;
}

const Grid: React.FC<GridProps> = ({
  keyword,
  fetch,
  typeRender: TypeRender,
  user,
}) => {
  const [cols, setCols] = useState(8);
  const [page, setPage] = useState<number>(1);
  const {
    reducer2: { windowSize },
    reducer3,
    reducer: select,
    reducer4: { layout },
  } = useAppSelector((state) => state);
  const { handleScrollTo } = usePosition();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    fetch!({
      source: select.source,
      type: select.type,
      keyword: keyword,
      user: user,
    });
  const list = useMemo(() => {
    return data?.pages.map((list: any) => list.items).flat();
  }, [data]); //gộp nhiều mảng page thành 1 mảng duy nhất
  const content = useMemo(() => {
    return setData(cols, list ? list : []);
  }, [cols, list]);

  useEffect(() => {
    page > 1 && fetchNextPage();
  }, [page]);

  useEffect(() => {
    if (cols !== setCol(windowSize)) {
      setCols(setCol(windowSize));
    }
  }, [windowSize]);

  useEffect(() => {
    handleScrollTo("auto", reducer3.scrollPosition);
  }, []);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 600
      ) {
        page !== page + 1 && setPage(page + 1);
      }
    };

    // Listen for scroll events
    hasNextPage && window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  useEffect(() => {
    page > 1 && setPage(1);
  }, [select]);

  return (
    <main
      className={`main px-[2vw] min-h-[calc(100vh-4rem)] relative lg:px-x ${
        isLoading
          ? "bg-grid bg-no-repeat bg-contain xs:bg-auto bg-center"
          : "mb-28"
      }`}
    >
      {isLoading && <Loader />}
      {isFetchingNextPage && <Loader className="md:hidden" />}
      <div className="picker flex gap-5 items-center mb-3 md:mt-1">
        <TypeRender />
      </div>
      {layout === 1 && (
        <div className={`gap-2 comic-list mb-10`}>
          {content.map((colRendered: any, key: number) => (
            <ColumnRender colRendered={colRendered} key={key} />
          ))}
        </div>
      )}
      {layout === 0 && (
        <div className="gap-[0.6rem] grid grid-cols-comic mb-10">
          {list?.map((comic: any, index: number) => (
            <ComicCard key={index} item={comic} />
          ))}
        </div>
      )}

      {hasNextPage && <LoadMore />}
    </main>
  );
};

export default Grid;
