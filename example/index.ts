import articulate from "../src/utils/articulate";
import { preStep } from "../src/steps/preStep";
import { inStep } from "../src/steps/inStep";
import { mapStep } from "../src/steps/mapStep";
import { outStep } from "../src/steps/outStep";
import { postStep } from "../src/steps/postStep";

(async () => {
  console.log("### START ###");

  await articulate({
    cfg: {
      lang: "en",
      title: "Articulate",
      dir: "./example/data",
      out: "./example/.build"
    },
    pre: preStep,
    in: inStep,
    map: mapStep,
    out: outStep,
    post: postStep
  });

  console.log("### END ###");
})();
