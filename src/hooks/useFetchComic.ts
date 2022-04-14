import { getComic } from "@/hooks/fetch";
import { useQuery } from "react-query";

const useFetchComic = (slug: any, source: any) => {
  return useQuery(["comic", slug], () => getComic({ source: source, slug: slug }));
}

export default useFetchComic;