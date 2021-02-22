import { WatchType } from "./type.ts";
import { fetchJsonData } from "fetch-api";
export class Api {
  parameter: string | number;
  watchType: WatchType;
  url: string;
  constructor(type: WatchType, param: number | string) {
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
        throw new TypeError("no param");
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
