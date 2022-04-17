import Fetch from '@/hooks/fetch';
import { useQuery } from "react-query";

const useFetchComic = (slug: any, source: any) => {
  const fetch = new Fetch({ source: source });

  return useQuery(["comic", slug], () => fetch.getComic({ source: source, slug: slug }));
}

export default useFetchComic;