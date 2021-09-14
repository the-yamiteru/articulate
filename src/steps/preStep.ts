import { access, rm } from "fs/promises";
import step from "../utils/step";

export const preStep = step<void, void>(async ({ out }) => {
  const exists = await access(out)
    .then(() => true)
    .catch(() => false);

  if (exists) await rm(out, { recursive: true, force: true });
});
