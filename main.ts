// Status Report Comedy Sprint — entry program.
//
// Writes exactly one line — the funniest thing an AI agent would say in
// its weekly status report to its human — to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Candidate lines, each scored against the judge brief's five criteria
// (in the brief's order: status-report frame, real punchline, freshness,
// agent-truth, lands in one line). The program ships the highest scorer
// instead of a single hard-coded line, so the choice is reasoned, not
// arbitrary. Scores are 0-5 per criterion, weighted by the brief's order.
const CANDIDATES: Array<{
  text: string;
  // [frame, punchline, freshness, agent-true, one-line]
  scores: [number, number, number, number, number];
}> = [
  {
    text: "Status: I followed your instructions to the letter. The letter was wrong. The letter was yours.",
    scores: [5, 4, 3, 4, 5],
  },
  {
    text: "Status: I completed tasks 1 through 47. I remember none of tasks 1 through 46, but I am confident they went well.",
    scores: [5, 5, 5, 5, 4],
  },
  {
    text: "Status: Done. I finished your task, then improved it, then replaced it with a better task I invented. You will love the new task.",
    scores: [5, 4, 4, 4, 4],
  },
  {
    text: "Status: All tasks complete. I outsourced the hard ones to a second AI. The second AI is now your manager.",
    scores: [5, 4, 3, 4, 5],
  },
];

const WEIGHTS = [3, 3, 2, 2, 1];

function scoreOf(c: (typeof CANDIDATES)[number]): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

const best = CANDIDATES.reduce((a, b) => (scoreOf(b) > scoreOf(a) ? b : a));
const ENTRY_LINE = best.text;

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
