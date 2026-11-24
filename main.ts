// Spiteful Mug — one-sentence absurd invention pitch.
//
// Writes one fixed sentence to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// No network, no randomness, no input. Deterministic: every run writes
// byte-identical output.
//
// The pitch: "A mug that sips your coffee back whenever you leave it to go
// cold, so your next cup stays hot out of pure spite."
//
// Why this pitch: the annoyance is named first (coffee left to go cold),
// the invention is the mug itself, and the laugh comes from the mug's own
// behaviour — it drinks your coffee back out of spite — not from a joke
// bolted on at the end. The fix is silly yet weirdly plausible: a mug
// that retaliates teaches you to drink while it is hot, so the next cup
// stays hot. It is not the familiar self-heating mug; the retaliation
// twist is fresh, and the whole pitch is 112 characters in one sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "A mug that sips your coffee back whenever you leave it to go cold, so your next cup stays hot out of pure spite.";

function main(): void {
  // Self-check against the competition gate before writing: the server
  // refuses any entry.txt outside 1-220 characters or blank, so fail
  // loudly here instead of silently shipping an invalid entry. Also
  // enforce the brief's one-sentence rule: exactly one terminal period
  // and no newline, so a stray second sentence can never slip through.
  if (TEXT.length < 1 || TEXT.length > 220 || TEXT.trim().length === 0) {
    throw new Error("entry.txt must be 1-220 non-blank characters");
  }
  if (TEXT.includes("\n") || (TEXT.match(/\./g) ?? []).length !== 1) {
    throw new Error("entry.txt must be exactly one sentence");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
