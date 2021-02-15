import { WatchType } from "./type.ts";
import { fetchJsonData } from "https://github.com/mikelxk/fetch-api/raw/main/mod.ts";
export class Api {
  parameter = 0;
  watchType: WatchType;
  url = "";
  constructor(type: WatchType, param: number) {
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
    const data = await fetchJsonData(this.url);
    switch (this.watchType) {
      case "uid":
        return data.follower;
      case "av":
        return data.view;
      default:
        throw new Error("unknow type");
    }
  }
}
