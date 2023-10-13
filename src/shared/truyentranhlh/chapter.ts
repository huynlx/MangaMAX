import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";
import axios from "@/utils/axios";

export const getChapter = async (
  source: string,
  comicSLug: any,
  chapterSLug: any,
  chapterId: any
): Promise<any> => {
  const links = [`truyen-tranh/${comicSLug}/${chapterSLug}`];

  const html = await Promise.all(
    links.map(async (link) => (await axios.get(link)).data)
  );
  const dom = parse(html[0]);

  return {
    title: decodeHTMLEntity(
      dom.querySelector(".rd_sidebar-name h5 a")?.innerText
    ),
    chapterCurrent: dom.querySelector("#chap_list .current a")?.innerText,
    updateAt: "?",
    images: dom.querySelectorAll("#chapter-content img").map((img) => {
      let url = img.getAttribute("data-src") ?? img.getAttribute("src") ?? "";
      return `/api/proxy2?url=${encodeURIComponent(url)}&source=${source}`;
    }),
    source,
  };
};
