import httpRequest from "./httpRequest";
import type { ApiResponse } from "./type";

export default class PersonalWebsiteApi {
  static async getPersonalWebsiteConfig(): Promise<ApiResponse> {
    const result = await httpRequest.get<ApiResponse>(
      "/personal-website/config"
    );
    return result.data;
  }
}
