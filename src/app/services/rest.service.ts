import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants.enum';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private static HEADERS_SIGN = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };

  public getRequestSign(url: string): Observable<any> {
    const source = new Observable(observer => {
      const URI = encodeURI(Constants.API_URL + url);
      this.httpClient.get(URI, RestService.HEADERS_SIGN).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });

    return source;
  }

  public postRequestSign(url: string, request): Observable<any> {
    const source = new Observable(observer => {
      const URI = encodeURI(Constants.API_URL + url);
      this.httpClient.post(URI, request, RestService.HEADERS_SIGN).subscribe(
        (response: HttpResponse<any>) => {
          observer.next(response);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });

    return source;
  }
}
