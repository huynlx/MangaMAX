import Fetch from '@/core/fetch';
import { useQuery } from "react-query";

const useFetchChapters = (slug: any, source: any) => {
  const fetch = new Fetch({ source: source });

  return useQuery(["chapters", { slug, source }], () => fetch.chapters({ source, slug }));
};

export default useFetchChapters;