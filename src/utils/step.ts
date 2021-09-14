import { Config } from "../types";

const step =
  <I, O>(callback: (config: Config, data: I) => Promise<O>) =>
  async (config: Config, data: I) =>
    await callback(config, data);

export default step;
