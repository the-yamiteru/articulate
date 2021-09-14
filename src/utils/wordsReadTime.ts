import { wordsCount } from "./wordsCount";
import { stripWhitespace } from "./stripWhitespace";
import { stripTags } from "./stripTags";

const WORDS_PER_MIN = 275;

export const wordsReadTime = (str: string, wordsPerMin = WORDS_PER_MIN) =>
  wordsCount(stripWhitespace(stripTags(str))) / wordsPerMin;
