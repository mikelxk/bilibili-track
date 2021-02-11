import { createInterface } from "readline";
import axios from "axios";
let myArgs = process.argv.slice(2);
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const loopFunc = async (uid, interval = 5000) => {
  const apiUrl = `https://api.bilibili.com/x/relation/stat?vmid=${uid}&jsonp=jsonp`;
  let prevFollower = 0;
  setInterval(async () => {
    let newFollower = await (await axios.get(apiUrl)).data.data.follower;
    console.log(
      `Followers: ${newFollower}, ${
        prevFollower == newFollower
          ? "~"
          : prevFollower < newFollower
          ? `+${newFollower - prevFollower}`
          : newFollower - prevFollower
      }`
    );
    prevFollower = newFollower;
  }, interval);
};
if (myArgs) {
    await loopFunc(myArgs[0]);
} else {
  rl.question("up uid? : ", async (uid) => {
    await loopFunc(uid);
  });
}