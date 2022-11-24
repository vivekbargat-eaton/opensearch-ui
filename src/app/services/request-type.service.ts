import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class LogData {
  public Time: Date;
  public Duration: number;
  public Url: string;
  public StatusTxt: string;
  public szSend: number;
  public szResponse: number;
  public QueryParams: string;
}

export enum CacheEnum {
  NoCache = 1,
  CacheWithRefresh = 2,
  LongTimeCache = 3,
}

@Injectable({
  providedIn: 'root',
})
export class RequestType {
  private static timeStamp: number = new Date().getTime();

  public static refresh() {
    this.timeStamp = new Date().getTime();
  }
  constructor(protected http: HttpClient) {}
  private static AllHsh: string = null;

  private static Log: LogData[] = new Array();

  public static getLog(): string {
    return JSON.stringify(RequestType.Log);
  }

  protected createDefaultHttpHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    return httpHeaders;
  }
 

  protected createQueryStringParams(
    cachemode: CacheEnum,
    parameter?: any
  ): HttpParams {
    let httpParams = new HttpParams();

    if (parameter != undefined && parameter != null) {
      for (var name in parameter) {
        httpParams = httpParams.set(name, parameter[name]);
      }
    }
    return httpParams;
  }

  private finishLogData(ld: LogData, status: string, ret: any) {
    ld.Duration = new Date().getTime() - ld.Time.getTime();
    ld.szResponse = JSON.stringify(ret).length;
    ld.StatusTxt = status;
  }

  public async post<T>(params: any, url: string): Promise<T> {

    var options = {
      headers: this.createDefaultHttpHeaders(),
    };

    var resp = await this.http
      .post<T>(url, params, options)
      .toPromise();
    if (resp) {
      return Promise.resolve<T>(resp);
    } else {
      return Promise.resolve<T>(null);
    }
  }

  public async getWithParams<T>(url: string, params?: any): Promise<T> {
    return await this.get<T>(CacheEnum.CacheWithRefresh, url, params);
  }

  public async get<T>(
    cachemode: CacheEnum,
    url: string,
    params?: any
  ): Promise<T> {

    var addedHeaders = this.createDefaultHttpHeaders();
    if (cachemode == CacheEnum.NoCache) {
      addedHeaders = addedHeaders.set('Cache-Control', 'no-cache');
      addedHeaders = addedHeaders.set('Pragma', 'no-cache');
      addedHeaders = addedHeaders.set('Expires', '0');
    }

    var options = {
      headers: addedHeaders,
      params: this.createQueryStringParams(cachemode, params),
    };

    var resp = await this.http.get<T>(url, options).toPromise();
    if (resp) {
      return Promise.resolve<T>(resp);
    } else {
      return Promise.resolve<T>(null);
    }
  }

  public async delete<T>(url: string): Promise<T> {
    var addedHeaders = this.createDefaultHttpHeaders();
    addedHeaders = addedHeaders.set('Cache-Control', 'no-cache');
    addedHeaders = addedHeaders.set('Pragma', 'no-cache');
    addedHeaders = addedHeaders.set('Expires', '0');

    var options = {
      headers: addedHeaders,
    };

    var resp = await this.http.delete<T>(url, options).toPromise();

    if (resp) {
      return Promise.resolve<T>(resp);
    } else {
      return Promise.resolve<T>(null);
    }
  }

  public async put<T>(params: any, url: string): Promise<T> {
    let data = JSON.stringify(params);
    var addedHeaders = this.createDefaultHttpHeaders();
    addedHeaders = addedHeaders.set('Cache-Control', 'no-cache');
    addedHeaders = addedHeaders.set('Pragma', 'no-cache');
    addedHeaders = addedHeaders.set('Expires', '0');

    var options = {
      headers: addedHeaders,
    };

    var resp = await this.http.put<T>(url, data, options).toPromise();
    if (resp) {
      return Promise.resolve<T>(resp);
    } else {
      return Promise.resolve<T>(null);
    }
  }
}
