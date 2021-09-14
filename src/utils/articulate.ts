import { Config, Step } from "../types";

const {
  hrtime: { bigint: now }
} = process;

const STEP_NAMES = ["pre", "in", "map", "out", "post"];

const articulate = async <T1, T2, T3, T4>(props: {
  cfg: Config;
  pre: Step<void, T1>;
  in: Step<T1, T2>;
  map: Step<T2, T3>;
  out: Step<T3, T4>;
  post: Step<T4, void>;
}) => {
  const steps = Object.freeze([props.pre, props.in, props.map, props.out, props.post]);
  const times = new Uint8Array(5);

  // unsafe mutable.. sigh
  let tmp: any = undefined;
  for (let i = 0; i < 5; ++i) {
    const start = now();
    tmp = await steps[i](props.cfg, tmp);
    times.set([Number(now() - start)], i);
  }

  const table = [...times].map((ns, i) => ({
    step: STEP_NAMES[i],
    ns,
    ms: ns / 1_000_000
  }));
  const sumNs = table.reduce((acc, v) => acc + v.ns, 0);
  const sumMs = sumNs / 1_000_000;

  console.log(`Sum: ${sumNs}ns / ${sumMs}ms`);

  console.table(table);
};

export default articulate;
