import * as urllib from 'urllib';
import { config, Context, provide } from 'midway';
import { RequestOptions } from 'urllib';

export interface IHttpClient extends HttpClient {}
@provide()
export class HttpClient {
  @config()
  httpclient: any;

  @config()
  ctx: Context;
  async curl(url: string, options: RequestOptions) {
    return urllib.request(url, { ...this.httpclient.request, ...options });
  }
}
