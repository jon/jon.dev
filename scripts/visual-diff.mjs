import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const [baselinePath, candidatePath, maskPath] = process.argv
  .slice(2)
  .filter((argument) => argument !== "--");

if (!baselinePath || !candidatePath || !maskPath) {
  console.error(
    "Usage: pnpm visual:diff -- <baseline.png> <candidate.png> <mask.png>",
  );
  process.exit(2);
}

const baseline = PNG.sync.read(readFileSync(baselinePath));
const candidate = PNG.sync.read(readFileSync(candidatePath));

if (
  baseline.width !== candidate.width ||
  baseline.height !== candidate.height
) {
  console.error(
    `Screenshot dimensions differ: ${baseline.width}x${baseline.height} vs ${candidate.width}x${candidate.height}`,
  );
  process.exit(2);
}

const mask = new PNG({
  width: baseline.width,
  height: baseline.height,
});

const changedPixels = pixelmatch(
  baseline.data,
  candidate.data,
  mask.data,
  baseline.width,
  baseline.height,
  {
    threshold: 0.1,
    includeAA: false,
    diffColor: [180, 35, 24],
    diffMask: true,
  },
);

mkdirSync(dirname(maskPath), { recursive: true });
writeFileSync(maskPath, PNG.sync.write(mask));

const totalPixels = baseline.width * baseline.height;
const changedPercent = (changedPixels / totalPixels) * 100;

console.log(
  JSON.stringify(
    {
      baseline: baselinePath,
      candidate: candidatePath,
      mask: maskPath,
      dimensions: `${baseline.width}x${baseline.height}`,
      changedPixels,
      changedPercent: Number(changedPercent.toFixed(4)),
    },
    null,
    2,
  ),
);
