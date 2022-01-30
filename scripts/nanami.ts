#!/usr/bin/env -S deno run --allow-run
const nanami = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-net",
    "--import-map=import_map.json",
    "mod.ts",
    "-u",
    "434334701",
    ...Deno.args,
  ],
});
await nanami.status();
