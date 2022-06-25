import axios from "@/utils/axios";

const getSearch = async (sourceNum: string, keyword: string, page: number = 1): Promise<any> => {
  const sections = {
    "Tìm truyện tranh": `https://api.comick.fun/search?lang=en-ja-vi&q=${encodeURI(keyword)}`
  }

  const htmls = await Promise.all(
    Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
  )

  const data = htmls.map((source, index) => {
    const items = [];

    for (let manga of source) {
      items.push({
        title: manga.title,
        cover: `https://meo3.comick.pictures/${manga.md_covers[0]?.b2key}?width=240`,
        chapter: null,
        chapSlug: null,
        chapId: null,
        slug: manga.slug + '-' + manga.id,
        updateAt: manga.updated_at,
        status: null,
        source: sourceNum
      });
    }

    const hasNextPage = false;
    const currentPage = page;

    return {
      name: Object.keys(sections)[index],
      nameAlt: 'Search results',
      items,
      hasNextPage,
      currentPage
    };
  });

  return data;

};

export default getSearch;