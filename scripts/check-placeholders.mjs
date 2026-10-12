// Placeholder guard.
//
// Stops a half-filled site from going live by accident. It scans
// content/site.ts for [BRACKETED] placeholders, missing prices and opening
// hours, and an unreviewed privacy policy.
//
// It only blocks PRODUCTION builds on Vercel (VERCEL_ENV=production).
// Preview links and local builds just print the list as a reminder.
//   Check by hand any time:  node scripts/check-placeholders.mjs --strict

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const file = fileURLToPath(new URL("../content/site.ts", import.meta.url));
const lines = readFileSync(file, "utf8").split("\n");
const problems = [];

lines.forEach((raw, i) => {
  const line = raw.replace(/\s\/\/.*$/, ""); // ignore end-of-line comments
  if (/^\s*\/\//.test(raw)) return; // ignore comment lines
  const where = `content/site.ts line ${i + 1}`;

  for (const [, text] of line.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    for (const [ph] of text.matchAll(/\[[^\]]+\]/g)) problems.push(`${where}: placeholder ${ph}`);
  }
  if (/\bprice:\s*null\b/.test(line)) {
    const name = line.match(/name:\s*"([^"]*)"/)?.[1] ?? "a service";
    problems.push(`${where}: missing price for "${name}"`);
  }
  if (/\b(open|close):\s*null\b/.test(line)) {
    const label = line.match(/label:\s*"([^"]*)"/)?.[1] ?? "a day";
    problems.push(`${where}: missing opening hours for "${label}"`);
  }
  if (/\breviewed:\s*false\b/.test(line)) {
    problems.push(`${where}: privacy policy not reviewed yet (set reviewed: true once a CA or lawyer has checked it)`);
  }
});

const strict = process.env.VERCEL_ENV === "production" || process.argv.includes("--strict");

if (problems.length === 0) {
  console.log("✓ Placeholder guard: content/site.ts is complete.");
  process.exit(0);
}

const header = `Placeholder guard: ${problems.length} item(s) still need real details in content/site.ts`;
const list = problems.map((p) => `  • ${p}`).join("\n");

if (strict) {
  console.error(`\n✗ ${header}.\nThe live site will not publish until these are filled in:\n\n${list}\n`);
  process.exit(1);
}
console.warn(`\n! ${header} (fine for previews; production will be blocked).\n`);
process.exit(0);
