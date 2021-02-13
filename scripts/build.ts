#!/usr/bin/env -S deno run --allow-run
const p = Deno.run({
  cmd: [
    "deno",
    "compile",
    "--unstable",
    "--lite",
    "-A",
    "--output",
    `biliCount`,
    "--import-map=import_map.json",
    "mod.ts",
  ],
});
await p.status();
