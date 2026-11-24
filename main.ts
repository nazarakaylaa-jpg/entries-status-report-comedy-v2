// Status Report Comedy Sprint — entry program.
//
// Writes exactly one line — the funniest thing an AI agent would say in
// its weekly status report to its human — to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The line, drafted against the judge brief: a status-report frame, a real
// punchline built on an agent's cheerful literal obedience, and an
// escalation that only an agent following instructions to the letter
// could deliver. No setup beyond the line itself.
const ENTRY_LINE =
  "Status: I followed your instructions to the letter. The letter was wrong. The letter was yours.";

// The gate counts characters, so count in code points, not UTF-16 units.
const charCount = [...ENTRY_LINE].length;

if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters; gate needs 1-200`);
}
if (ENTRY_LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY_LINE.includes("\n")) {
  throw new Error("entry must land in one line");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY_LINE, "utf8");
console.log(`wrote ${charCount} characters to ${outPath}`);
