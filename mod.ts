#!/usr/bin/env -S deno run --unstable --allow-net --import-map=import_map.json
import { parse } from "std/flags/mod.ts";
import { readLines } from "std/io/bufio.ts";
import { green, red, yellow } from "std/fmt/colors.ts";
const args = parse(Deno.args);
const uid = args.u || (await promptUid("Enter Uid:")) || 2; //uncle's uid
const interval = args.i || 5000;//defaults to 5s
async function promptUid(question: string) {
  console.log(question);
  for await (const line of readLines(Deno.stdin)) {
    return parseInt(line);
  }
}

console.log(`Uid : ${uid}`);
let beforeFollower = 0,
  afterFollower = 0;
setInterval(async () => {
  const res = await fetch(
    `https://api.bilibili.com/x/relation/stat?vmid=${uid}&jsonp=jsonp`,
  );
  const data = await res.json();
  let diffStr = "";
  let colorFunc = yellow;
  afterFollower = data.data.follower;
  if (afterFollower == beforeFollower) {
    colorFunc = yellow;
    diffStr = "~";
  } else if (afterFollower > beforeFollower) {
    colorFunc = green;
    diffStr = `+${afterFollower - beforeFollower}`;
  } else if (afterFollower < beforeFollower) {
    colorFunc = red;
    diffStr = `${afterFollower - beforeFollower}`;
  }
  console.log(
    `${new Date().toLocaleString()} : `,
    colorFunc(`${afterFollower} ${diffStr}`),
  );
  beforeFollower = afterFollower;
}, interval);
