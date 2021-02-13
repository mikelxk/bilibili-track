#!/usr/bin/env -S deno run --allow-run
const run = Deno.run({
  cmd: [
    "deno",
    "run",
    "--unstable",
    "--allow-net",
    "--import-map=import_map.json",
    "mod.ts",
    ...Deno.args,
  ],
});
await run.status();
