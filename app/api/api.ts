import httpRequest from "./httpRequest";
import type { ApiResponse } from "./type";

export default class PersonalWebsiteApi {
  static async getPersonalWebsiteDirectory(): Promise<ApiResponse> {
    const result = await httpRequest.get<ApiResponse>(
      "/personal-website/directory"
    );
    return result.data;
  }
}
