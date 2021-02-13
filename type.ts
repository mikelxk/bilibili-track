export type WatchType = "uuid" | "av";
export class Api {
  parameter?: number;
  type: WatchType;
  url = "";
  constructor(type: WatchType, param?: number) {
    this.parameter = param;
    this.type = type;
    switch (type) {
      case "uuid":
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
  async getCount(): Promise<number> {
    const res = await fetch(this.url);
    const json = await res.json();
    switch (this.type) {
      case "uuid":
        return json.data.follower;
      case "av":
        return json.data.view;
      default:
        return json.data.follower;
    }
  }
}
