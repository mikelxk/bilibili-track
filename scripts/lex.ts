#!/usr/bin/env -S deno run --allow-run
const lex = Deno.run({
  cmd: [
    "deno",
    "run",
    "--unstable",
    "--allow-net",
    "--import-map=import_map.json",
    "mod.ts",
    "-u",
    "777536",
  ],
});
await lex.status();
