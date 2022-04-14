import { getChapter } from "@/hooks/fetch";
import { useQuery } from "react-query";

const useFetchChapter = (slug: any, source: any, chapter: any, id: any) => {
  return useQuery(["chapter", { slug, id }], () => getChapter({ source, slug, chapter, id }));
}

export default useFetchChapter;