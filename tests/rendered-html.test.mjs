import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the jon.dev index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
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

test("server-renders a Git-managed writing entry", async () => {
  const response = await render("/writing/why-this-site-exists");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Why this site exists — jon\.dev<\/title>/i);
  assert.match(
    html,
    /This is a small home for things I want to keep on the public web\./,
  );
  assert.match(html, /both are managed in Git/);
  assert.match(html, /href="\/projects"/);
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
  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
  await assert.rejects(
    access(new URL("public/favicon.svg", projectRoot)),
  );
});
