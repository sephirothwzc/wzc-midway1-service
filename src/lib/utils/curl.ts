import * as urllib from 'urllib';
import { config, provide } from 'midway';

export interface IHttpClient extends HttpClient {}
@provide()
export class HttpClient {
  @config()
  httpclient: any;

  async curl(url: string, options: any) {
    return urllib.request(url, { ...this.httpclient.request, ...options });
  }
}
