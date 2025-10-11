import axios from "axios";
import Config from "~/configs";

class HttpRequest {
  private client;
  constructor() {
    this.client = axios.create({
      baseURL: Config.apiBaseUrl,
      headers: {
        "x-api-key": Config.apikey,
      },
    });

    this.client.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        if (err?.response?.data?.message) {
          return Promise.reject(new Error(err.response.data.message));
        }

        return Promise.reject(err);
      }
    );
  }

  public getClient() {
    return this.client;
  }
}

export default new HttpRequest().getClient();
