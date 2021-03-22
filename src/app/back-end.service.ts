import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private http: HttpClient) { }


  public async get(url: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpParams: HttpParams = new HttpParams();
      if (params && Object.keys(params)) {
        Object.keys(params).forEach(ele => {
          httpParams[ele] = params[ele];
        })
      }
      this.http.get(url, {
        params: params, responseType: 'json',
        reportProgress: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),

      }).subscribe((data) => {
        if (data) {
          resolve(data);
        }
      })
    })
  }

  public async post(url: string, body: any, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpParams: HttpParams = new HttpParams();
      if (params && Object.keys(params)) {
        Object.keys(params).forEach(ele => {
          httpParams[ele] = params[ele];
        })
      }
      this.http.post(url, body, {
        params: params, responseType: 'json',
        reportProgress: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'my-auth-token',
          'Access-Control-Allow-Origin': '*',
        })
      }).subscribe((data) => {
        if (data) {
          resolve(data);
        }
      })
    })
  }


}
