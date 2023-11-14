import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { setTheme } from 'ngx-bootstrap/utils';
import * as Aos from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http:HttpClient){
    
  }

  ngOnInit(){
    Aos.init();
    this.getData();
    setTheme('bs5'); // or 'bs4'
  }

  getData(){
    const headersOption = new HttpHeaders({
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uIjpudWxsLCJpYXQiOjE2OTk2MzU1MjgsImV4cCI6MTY5OTcyMTkyOH0.ailosPpawklCigKPylyoxrwm1Y82H0PF3IOIhTkMkKA"
    })
    const payload ={
        "email":"rj@gmail.com"
    }
    this.http.post("http://localhost:1010/getUser",payload,{headers:headersOption}).subscribe((resp)=>{
        console.log(resp);
    },(err)=>{
        console.log(err);
    })
  }
  title = 'ANG_Authentication';
}
