import { createInterface } from "readline";
import axios from "axios";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("up uid? : ", async (uid) => {
  await loopFunc(uid);
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
