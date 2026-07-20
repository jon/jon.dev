import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function renderedHtml(pathname = "index.html") {
  return readFile(new URL(`../out/${pathname}`, import.meta.url), "utf8");
}

test("exports the jon.dev index as static HTML", async () => {
  const html = await renderedHtml();
  assert.match(html, /<title>jon\.dev<\/title>/i);
  assert.match(html, /class="identity-title"/);
  assert.match(
    html,
    /<address class="site-location meta">Seattle<\/address>/,
  );
  assert.match(
    html,
    /class="copyright meta">©[\s\S]*?2026[\s\S]*?Jon Olson<\/span>/,
  );
  assert.doesNotMatch(
    html,
    /Personal site|Work in progress|About|Writing and work|Why this site exists|Selected project/i,
  );
  assert.doesNotMatch(
    html,
    /codex-preview|react-loading-skeleton|Your site is taking shape/i,
  );
});

test("keeps screen-reader landmarks and labels intentional", async () => {
  const html = await renderedHtml();
  assert.equal(html.match(/<main(?:\s|>)/g)?.length, 1);
  assert.match(html, /<header[\s\S]*<main[\s\S]*<footer/);
  assert.match(html, /href="#main-content">Skip to content<\/a>/);
  assert.match(
    html,
    /<main class="identity grid" id="main-content" tabindex="-1">/,
  );
  assert.match(
    html,
    /<h1 class="identity-title"><span>jon<\/span><span class="accent">\.<\/span><span>dev<\/span><\/h1>/,
  );
  assert.doesNotMatch(html, /aria-hidden="true"/);
});

test("does not publish empty writing or project sections", async () => {
  await assert.rejects(access(new URL("../out/writing", import.meta.url)));
  await assert.rejects(access(new URL("../out/projects", import.meta.url)));
});

test("ships landing-page metadata without starter assets", async () => {
  const [packageJson, layout, content] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "jon-dev"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(layout, /og\.png/);
  assert.doesNotMatch(content, /writing|projects/i);

  assert.equal(
    await readFile(new URL("../out/CNAME", import.meta.url), "utf8"),
    "jon.dev\n",
  );
  await access(new URL("../out/.nojekyll", import.meta.url));
  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
  await assert.rejects(
    access(new URL("public/favicon.svg", projectRoot)),
  );
});
