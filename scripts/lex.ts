#!/usr/bin/env -S deno run --allow-run
const lex = Deno.run({
  cmd: [
    "deno",
    "run",
    "--unstable",
    "-A",
    "--import-map=import_map.json",
    "mod.ts",
    "-u",
    "777536",
  ],
});
await lex.status();
