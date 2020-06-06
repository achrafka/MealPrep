import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  url;
  constructor( private http: HttpClient ) { }
  Savesresponse(responce) {
    this.url =  'http://localhost:4200/Api/login/Savesresponse';
    return this.http.post(this.url, responce);
  }
}
