import instance from "@/utils/axios";

const getHome = async (page: number = 1, type: string, sourceNum: string): Promise<any> => {

  const handleSource = () => {
    if (type === 'browse') {
      return `hot?page=${page}`
    } else {
      return `https://api.mangaii.com/api/v1/comics?page=${page}&limit=100`
    }
  }

  const handleData = () => {
    return htmls.map((source, index) => {
      const items = [];

      for (const manga of source.data) {
        const title = manga.name;
        const id = 'https://mangaii.com/comic/' + manga.slug;
        const image = `https://api.mangaii.com/media/cover_images/${manga.cover_image}`; 
        const sub = 'Chapter ' + manga.chapter?.number;
        items.push({
          subtitleText: sub,
          title: title,
          cover: image ?? "",
          chapter: sub,
          chapSlug: 'test',
          chapId: sub,
          slug: id.split('/').pop(),
          updateAt: null,
          status: null,
          source: sourceNum
        });
      }

      const hasNextPage = true;
      const currentPage = page;

      return {
        name: 'Truyện',
        items,
        hasNextPage,
        currentPage
      };
    });
  }

  const sections = {
    [type]: handleSource()
  }

  const htmls = await Promise.all(
    Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
  )

  const data = handleData();

  return data;

};

export default getHome;