import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function renderedHtml(pathname = "index.html") {
  return readFile(new URL(`../out/${pathname}`, import.meta.url), "utf8");
}

test("exports the jon.dev index as static HTML", async () => {
  const html = await renderedHtml();
  assert.match(html, /<title>Index — jon\.dev<\/title>/i);
  assert.match(html, /class="hero-title"/);
  assert.match(html, /Personal index/);
  assert.match(html, /Why this site exists/);
  assert.match(html, /Selected project/);
  assert.match(html, /https:\/\/jon\.dev\/og\.png/);
  assert.doesNotMatch(
    html,
    /codex-preview|react-loading-skeleton|Your site is taking shape/i,
  );
});

test("exports a Git-managed writing entry", async () => {
  const html = await renderedHtml(
    "writing/why-this-site-exists/index.html",
  );
  assert.match(html, /<title>Why this site exists — jon\.dev<\/title>/i);
  assert.match(
    html,
    /This is a small home for things I want to keep on the public web\./,
  );
  assert.match(html, /both are managed in Git/);
  assert.match(html, /href="\/projects\/"/);
});

test("ships project content and social metadata without starter assets", async () => {
  const [packageJson, layout, content] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/site.ts", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "jon-dev"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /images:\s*\[\s*{\s*url:\s*"\/og\.png"/);
  assert.match(content, /slug:\s*"why-this-site-exists"/);
  assert.match(content, /slug:\s*"jon-dev"/);

  await access(new URL("../public/og.png", import.meta.url));
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
