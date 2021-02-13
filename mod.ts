#!/usr/bin/env -S deno run --unstable --allow-net --import-map=import_map.json
import { parse } from "std/flags/mod.ts";
import { readLines } from "std/io/bufio.ts";
import { green, red, yellow } from "std/fmt/colors.ts";
import { Api, WatchType } from "./type.ts";
const args = parse(Deno.args);
const uid: number | undefined = args.u;
const av: number | undefined = args.a;

let watchType: WatchType;
const interval = args.i || 5000; //defaults to 5s
if ((uid && av) || !(uid || av)) {
  await man();
}
const param: number | undefined = uid || av;
if (uid) {
  watchType = "uuid";
} else {
  watchType = "av";
}
const api = new Api(watchType, param);
console.log(`${api.type} : ${api.parameter}`);
let numBefore = 0,
  numAfter = 0;
setInterval(async () => {
  numAfter = await api.getCount();
  let diffStr: string;
  let colorFunc = yellow;
  if (numAfter == numBefore) {
    colorFunc = yellow;
    diffStr = "~~";
  } else if (numAfter > numBefore) {
    colorFunc = green;
    diffStr = `+${numAfter - numBefore}`;
  } else {
    colorFunc = red;
    diffStr = `${numAfter - numBefore}`;
  }
  console.log(
    `${new Date().toLocaleString()} : `,
    colorFunc(`${numAfter} ${diffStr}`),
  );
  numBefore = numAfter;
}, interval);
async function man() {
  console.log(`
  -u uuid     watch a up's count
  -a av       watch a video's count
  -i interval set interval between each fetch

  Press enter to quit
  `);
  for await (const _line of readLines(Deno.stdin)) {
    Deno.exit(0);
  }
}
