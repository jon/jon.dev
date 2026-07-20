# Repository instructions

This repository publishes `jon.dev` as a static Next.js site on GitHub Pages.
Keep the site minimalist, grid-led, fast, and usable without JavaScript.

## Release rule

Do not push a site update until the release procedure below passes. A change is
not visually verified merely because its markup, styles, build, or tests look
correct.

## Release procedure

1. Audit the project underpinnings before changing or deploying the site:

   ```sh
   node --version
   pnpm --version
   pnpm outdated --format json || true
   ```

   Check the official Node.js release status and the current stable releases of
   pnpm, direct production and development dependencies, and every GitHub Action
   used by the workflow. Be greedy about compatible upgrades:
   - build and test on the newest Active LTS Node.js major; keep
     `.node-version`, `package.json` engines, `@types/node`, and the workflow in
     sync
   - pin the newest stable pnpm release in `packageManager`
   - upgrade direct dependencies and development dependencies to their newest
     stable releases, including new majors, unless a verified incompatibility
     blocks the upgrade
   - use the newest stable major of each GitHub Action and eliminate action
     runtime deprecation warnings

   Apply available upgrades before the site change, regenerate the lockfile, and
   run lint and tests. Put toolchain, dependency, lockfile, and workflow upgrades
   in their own focused commit; do not mix them with content, design, or feature
   work. If an upgrade is blocked, record the exact incompatibility in the
   release report rather than silently leaving the stack stale. If nothing is
   outdated, say so in the release report and do not create an empty commit.
2. Confirm the intended scope with `git status --short` and inspect the complete
   diff. Preserve unrelated user changes. Run `git diff --check`.
3. Run `pnpm lint` and `pnpm test`. The test command includes the production
   static export.
4. Serve the baseline and candidate static exports on separate local ports.
   Use the current `origin/main` merge base as the baseline, not memory or an
   older screenshot. Build the baseline in a detached temporary worktree so the
   active working tree is not rewritten or stashed:

   ```sh
   git fetch origin main
   git worktree add --detach work/release-baseline "$(git merge-base HEAD origin/main)"
   (cd work/release-baseline && pnpm install --frozen-lockfile && pnpm build)
   pnpm build
   python3 -m http.server 4173 --directory work/release-baseline/out
   python3 -m http.server 4174 --directory out
   ```

   Run the two servers in separate terminals and leave them running through
   visual review.
5. Capture full-page PNG screenshots of both versions with the same Chrome
   engine, device scale, font state, animation state, and viewport:

   ```sh
   pnpm visual:capture -- \
     http://127.0.0.1:4173 \
     http://127.0.0.1:4174 \
     work/release-visuals
   ```

   The command captures:
   - desktop: 1440 × 1000 CSS pixels
   - mobile: 390 × 844 CSS pixels
   - narrow mobile: 320 × 700 CSS pixels

   It also writes `captures.json`; any `horizontalOverflow: true` result fails
   the release. Temporary captures live under `work/release-visuals/`, which is
   ignored by Git.
6. Generate a transparent delta mask for each viewport:

   ```sh
   for viewport in desktop mobile narrow; do
     pnpm visual:diff -- \
       "work/release-visuals/baseline-$viewport.png" \
       "work/release-visuals/candidate-$viewport.png" \
       "work/release-visuals/mask-$viewport.png"
   done
   ```

   The command reports changed-pixel count and percentage. A low percentage is
   not automatically safe, and a high percentage is not automatically a
   regression.
7. Inspect the baseline, candidate, and mask as images. AI review must explicitly
   describe and classify every changed region as intended, incidental but safe,
   or a regression. Inspect at least:
   - grid and baseline alignment
   - unexpected wrapping, clipping, overflow, or horizontal scrolling
   - spacing, type scale, line length, and hierarchy
   - color, borders, contrast, and focus visibility
   - content accidentally added, removed, duplicated, or obscured
   Never approve screenshots from DOM or CSS inspection alone.
8. Treat mobile as a first-class layout, not a shrunk desktop page. At 390 px,
   verify reading order, comfortable page edges, intentional title wrapping,
   touch-safe controls, and no off-canvas content. Also inspect at 320 px when a
   change affects width, typography, or the grid.
9. Treat screen readers as first-class consumers. Verify one `<main>` landmark,
   a logical heading outline, useful link names, sensible accessible names and
   reading order, decorative content hidden from assistive technology, and no
   duplicated announcements. Keyboard-test every control, including the skip
   link and visible focus state. Confirm reduced-motion behavior and check text
   contrast. Test at 200% browser zoom when layout or type changes.
10. If any delta is unexplained or any accessibility check fails, fix it and
   repeat capture, mask generation, and review. Keep the final evidence in
   `work/release-visuals/` for the duration of the release.
11. Commit as `Jon Olson <jon@jon.dev>`, push normally, and watch the GitHub Pages
    workflow to a successful conclusion. Then make a verified HTTPS request to
    `https://jon.dev`, capture the live desktop and mobile views, and compare
    them with the approved candidate. Report the deployed commit and any
    remaining caveat.

After verification, stop both local servers and remove the temporary worktree
with `git worktree remove work/release-baseline`.

Force-push only when Jon explicitly requests history rewriting. Use
`--force-with-lease`, preserve a local safety ref until the new history and live
deployment are verified, and never change DNS as part of a normal release.
