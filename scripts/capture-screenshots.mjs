import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const [baselineUrl, candidateUrl, outputArgument = "work/release-visuals"] =
  process.argv.slice(2).filter((argument) => argument !== "--");

if (!baselineUrl || !candidateUrl) {
  console.error(
    "Usage: pnpm visual:capture -- <baseline-url> <candidate-url> [output-directory]",
  );
  process.exit(2);
}

const outputDirectory = resolve(outputArgument);
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 700 },
];
const versions = [
  { name: "baseline", url: baselineUrl },
  { name: "candidate", url: candidateUrl },
];

mkdirSync(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const version of versions) {
      await page.goto(version.url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content:
          "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
      });

      const path = resolve(
        outputDirectory,
        `${version.name}-${viewport.name}.png`,
      );
      await page.screenshot({
        path,
        fullPage: true,
        animations: "disabled",
      });

      const metrics = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
      }));

      results.push({
        version: version.name,
        viewport: viewport.name,
        path,
        ...metrics,
        horizontalOverflow:
          metrics.documentWidth > metrics.viewportWidth,
      });
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const manifestPath = resolve(outputDirectory, "captures.json");
writeFileSync(manifestPath, `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify({ manifest: manifestPath, captures: results }, null, 2));
