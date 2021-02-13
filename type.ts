export type WatchType = "uid" | "av";
export class Api {
  parameter?: number;
  watchType: WatchType;
  url = "";
  constructor(type: WatchType, param?: number) {
    this.parameter = param;
    this.watchType = type;
    switch (type) {
      case "uid":
        this.url =
          `https://api.bilibili.com/x/relation/stat?vmid=${this.parameter}&jsonp=jsonp`;
        break;
      case "av":
        this.url =
          `http://api.bilibili.com/archive_stat/stat?aid=${this.parameter}&type=jsonp`;
        break;
      default:
        throw new Error("no param");
    }
  }
/**
 * get data according to watchType
 */
  async getCount(): Promise<number> {
    const res = await fetch(this.url);
    const json = await res.json();
    switch (this.watchType) {
      case "uid":
        return json.data.follower;
      case "av":
        return json.data.view;
      default:
        throw new Error("unknow type");
    }
  }
}
