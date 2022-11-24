import { Injectable } from '@angular/core';
import { RequestType } from './request-type.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private opensearchServiceUrl: string;
  private matchSearchUrl: string;
  private phraseSearchUrl: string;
  private queryStringSearchUrl: string;
  private rangeSearchUrl: string;
  private termSearchUrl: string;
  private luceneSearchUrl: string;
  private getIndicesUrl: string;
  private getIndexMappingUrl: string;
  private deleteIndexUrl: string;

  constructor(private http: HttpClient) {
    this.opensearchServiceUrl = `http://localhost:3000/api`;
    this.matchSearchUrl = `${this.opensearchServiceUrl}/match`;
    this.phraseSearchUrl = `${this.opensearchServiceUrl}/phrase`;
    this.queryStringSearchUrl = `${this.opensearchServiceUrl}/queryString`;
    this.rangeSearchUrl = `${this.opensearchServiceUrl}/range`;
    this.termSearchUrl = `${this.opensearchServiceUrl}/term`;
    this.luceneSearchUrl = `${this.opensearchServiceUrl}/luceneSearch`;
    this.getIndicesUrl = `${this.opensearchServiceUrl}/getIndices`;
    this.getIndexMappingUrl = `${this.opensearchServiceUrl}/getMapping`;
    this.deleteIndexUrl = `${this.opensearchServiceUrl}/delete`;
  }

  async getMatchSearch(
    field: string,
    query: string,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.matchSearchUrl}'/'${field}'/'${query}'/'${from}'/'${size}`
    );
  }

  async getPhraseSearch(
    field: string,
    query: string,
    slop: number,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.phraseSearchUrl}'/'${field}'/'${query}'/'${slop}'/'${from}'/'${size}`
    );
  }

  async getQueryStringSearch(
    field: string,
    query: string,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.queryStringSearchUrl}'/'${field}'/'${query}'/'${from}'/'${size}`
    );
  }

  async getRangeSearch(
    field: string,
    gte: string,
    lte: string,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.rangeSearchUrl}'/'${field}'/'${gte}'/'${lte}'/'${from}'/'${size}`
    );
  }

  async getTermSearch(
    field: string,
    value: string,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.termSearchUrl}/${field}/${value}/${from}/${size}`
    );
  }

  async getLuceneSearch(
    query: string,
    from: number,
    size: number
  ): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.luceneSearchUrl}/${query}/${from}/${size}`
    );
  }

  async getIndices(): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      this.getIndicesUrl
    );
  }

  async getIndexMapping(indexName: string): Promise<any> {
    return await new RequestType(this.http).getWithParams<any>(
      `${this.getIndexMappingUrl}'/'${indexName}`
    );
  }

  async deleteIndex(indexName: string): Promise<any> {
    return await new RequestType(this.http).delete<any>(
      `${this.deleteIndexUrl}'/'${indexName}`
    );
  }
}
