export type Maybe<T> = T | null;

export type Config = {
  dir: string;
  out: string;
  lang: string;
  title: string;
};

export type Step<I, O> = (config: Config, data: I) => Promise<O>;

export type Article = {
  metaData: {
    title: string;
    slug: string;
    description: Maybe<string>;
  };
  markDown: string;
  readTime: number;
};

export type File = {
  filename: string;
  content: string;
};
