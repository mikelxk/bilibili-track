import { parse } from "https://deno.land/std/flags/mod.ts";
import { readLines } from "https://deno.land/std/io/bufio.ts";
import * as Colors from "https://deno.land/std@0.86.0/fmt/colors.ts";
let args = parse(Deno.args);
let uid = 2; //uncle's uid
let interval = 5000;
async function promptUid(question: string) {
  console.log(question);
  for await (const line of readLines(Deno.stdin)) {
    return parseInt(line);
  }
}
if (args.u) {
  uid = args.u;
} else {
  uid = (await promptUid("Enter Uid:")) || uid;
}
if (args.i) {
  interval = args.i;
}
console.log(`Uid : ${uid}`);
let beforeFollower = 0,
  afterFollower = 0;
let numColor = "black";
setInterval(async () => {
  const res = await fetch(
    `https://api.bilibili.com/x/relation/stat?vmid=${uid}&jsonp=jsonp`
  );
  let data = await res.json();
  let diffStr = "";
  afterFollower = data.data.follower;
  if (afterFollower == beforeFollower) {
    numColor = "yellow";
    diffStr = "~";
  } else if (afterFollower > beforeFollower) {
    numColor = "green";
    diffStr = `+${afterFollower - beforeFollower}`;
  } else if (afterFollower < beforeFollower) {
    numColor = "red";
    diffStr = `${afterFollower - beforeFollower}`;
  }
  //@ts-ignore
  console.log(Colors[numColor](`${afterFollower} ${diffStr}`));
  beforeFollower = afterFollower;
}, interval);
