import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import step from "../utils/step";
import { wordsReadTime } from "../utils/wordsReadTime";
import { Article } from "../types";

export const inStep = step<void, Article[]>(async ({ dir }) => {
  const allFilenames = await readdir(dir);
  const mdFilenames = allFilenames.filter(filename => filename.indexOf(".md") >= 0);
  const length = mdFilenames.length;
  const files: Article[] = [];

  for (let i = 0; i < length; ++i) {
    const filename = mdFilenames[i];
    const extensionLess = filename.replace(".md", "");
    const raw = await readFile(`${dir}/${filename}`);
    const { data, content: markDown } = matter(raw);
    const readTime = wordsReadTime(markDown);

    const slug = (data.slug as string) || extensionLess;
    const title = (data.title as string) || slug;
    const description = (data.description as string) || null;
    const metaData: Article["metaData"] = {
      title,
      slug,
      description
    };

    files.push({
      metaData,
      markDown,
      readTime
    });
  }

  return files;
});
