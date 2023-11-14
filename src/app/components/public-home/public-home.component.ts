import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent {
  constructor(private route:Router){}
  ngOnInit(){
    if(localStorage.getItem('token') != null){
      this.route.navigate(['dashboard'])
    }
  }
}
