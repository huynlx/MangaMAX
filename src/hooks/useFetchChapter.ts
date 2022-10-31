import Fetch from '@/core/fetch';
import { useQuery } from "react-query";

const useFetchChapter = (slug: any, source: any, chapter: any, id: any) => {
  const fetch = new Fetch({ source: source });

  return useQuery(["chapter", { slug, id }], () => fetch.chapter({ source, slug, chapter, id }), {
    refetchOnMount: true
  });
};

export default useFetchChapter;