import { parse } from "https://deno.land/std/flags/mod.ts";
import { readLines } from "https://deno.land/std/io/bufio.ts";
import { green, red, yellow } from "https://deno.land/std@0.86.0/fmt/colors.ts";
const args = parse(Deno.args);
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
setInterval(async () => {
  const res = await fetch(
    `https://api.bilibili.com/x/relation/stat?vmid=${uid}&jsonp=jsonp`,
  );
  let data = await res.json();
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
  console.log(`${new Date().toLocaleString()} : `,colorFunc(`${afterFollower} ${diffStr}`));
  beforeFollower = afterFollower;
}, interval);
