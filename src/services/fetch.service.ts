import { Injectable } from '@nestjs/common';
import * as https from 'https';

import { apiKey, apiUrl } from 'src/config';
import { HttpMethods, RequestOptions } from 'src/types/interfaces';

@Injectable()
abstract class FetchService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private getQueryParams(params: Record<string, string> = {}): string {
    const paramsString: string = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return `api_key=${this.apiKey}&${paramsString}`;
  }

  private request<T>(options: RequestOptions, body?: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      const req = https.request({ protocol: 'https:', ...options }, (res) => {
        const data = [];

        res.on('data', (chunk) => {
          data.push(chunk);
        });

        res.on('end', () => {
          const dataBuffer = Buffer.concat(data);
          const dataAsString = dataBuffer.toString('utf8');

          if (res.statusCode !== 200) {
            return reject(dataAsString);
          }

          const dataJSON = JSON.parse(dataAsString);
          resolve(dataJSON);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  private getRequestPath(path: string, queryParams?: Record<string, string>): string {
    const queryParamsAsString: string = this.getQueryParams(queryParams);
    return `${path}?${queryParamsAsString}`;
  }

  private getRequestOptions(options: RequestOptions, method: string) {
    const { path, queryParams } = options;
    const requestPath: string = this.getRequestPath(path, queryParams);

    return {
      method,
      hostname: this.baseUrl,
      path: requestPath,
    };
  }

  protected get<T>(options: RequestOptions): Promise<T> {
    const requestOptions = this.getRequestOptions(options, HttpMethods.GET);
    return this.request<T>(requestOptions);
  }

  protected post<T>(options: RequestOptions): Promise<T> {
    const { body, ...rest } = options;
    const requestOptions = this.getRequestOptions(rest, HttpMethods.POST);

    return this.request<T>(requestOptions, body);
  }

  protected put<T>(options: RequestOptions): Promise<T> {
    const { body, ...rest } = options;
    const requestOptions = this.getRequestOptions(rest, HttpMethods.PUT);

    return this.request<T>(requestOptions, body);
  }

  protected delete<T>(options: RequestOptions): Promise<T> {
    const requestOptions = this.getRequestOptions(options, HttpMethods.DELETE);
    return this.request<T>(requestOptions);
  }
}

export default FetchService;
