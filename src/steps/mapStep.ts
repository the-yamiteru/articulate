import step from "../utils/step";
import { Article, File } from "../types";
import { Remarkable } from "remarkable";
import { minify } from "html-minifier-terser";

const md = new Remarkable();

export const mapStep = step<Article[], File[]>(async ({ lang, title: appTitle }, articles) => {
  const length = articles.length;
  const files: File[] = [];

  for (let i = 0; i < length; ++i) {
    const {
      markDown,
      metaData: { title, description, slug }
    } = articles[i];
    const parsed = md.render(markDown);
    const htmlDocument = await minify(
      `
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>${appTitle} - ${title}</title>
        ${description ? `<meta name="description" content="${description}">` : ""}
      </head>

      <body>
        <main>
          ${parsed}
        </main>
      </body>
    </html>
    `,
      {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        useShortDoctype: true
      }
    );

    files.push({
      filename: `${slug}.html`,
      content: htmlDocument
    });
  }

  return files;
});
