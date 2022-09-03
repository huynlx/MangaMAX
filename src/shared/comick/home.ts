import instance from "@/utils/axios";

const getHome = async (page: number = 1, type: string, sourceNum: string): Promise<any> => {

  const handleSource = () => {
    if (type === 'browse') {
      return `https://api.comick.fun/chapter?lang=en-ja-vi&page=${page}&device-memory=8&order=hot`;
    } else {
      return `https://api.comick.fun/chapter?lang=en-ja-vi&page=${page}&device-memory=8&order=new`;
    }
  };

  const handleData = () => {
    return htmls.map((source, index) => {
      const items = [];

      for (let manga of source) {
        items.push({
          title: manga.md_comics.title,
          cover: `https://meo3.comick.pictures/${manga.md_comics.md_covers[0]?.b2key}?width=240`,
          chapter: 'Chap ' + manga.md_comics.last_chapter,
          chapSlug: manga.hid + '-chapter-' + manga.chap + '-en',
          chapId: manga.hid,
          slug: manga.md_comics.slug + '-' + manga.md_comics.id,
          updateAt: manga.updated_at,
          status: null,
          source: sourceNum
        });
      }

      const hasNextPage = page <= 40 ? true : false;
      const currentPage = page;

      return {
        name: 'Truyện',
        items,
        hasNextPage,
        currentPage
      };
    });
  };

  const sections = {
    [type]: handleSource()
  };

  const htmls = await Promise.all(
    Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
  );

  const data = handleData();

  return data;

};

export default getHome;