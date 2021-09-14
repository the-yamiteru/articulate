import step from "../utils/step";
import { mkdir, writeFile } from "fs/promises";
import { File } from "../types";

export const outStep = step<File[], void>(async ({ out }, files) => {
  await mkdir(out);
  await Promise.allSettled(
    files.map(({ filename, content }) => writeFile(`${out}/${filename}`, content))
  );
});
