import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postService(url:string,payload?:any,headers?:any){
    return new Promise((resolve,reject)=>
    {
      this.http.post(url,payload,{headers:headers}).subscribe((resp)=>{
        resolve(resp);
      },(err)=>{
        reject(err);
      })
    })
  }
}
