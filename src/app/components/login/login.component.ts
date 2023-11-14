import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  ngOnInit(){
    if(localStorage.getItem('token') != null){
      this.route.navigate(['dashboard'])
    }
  }
  constructor(private route:Router,private api:ApiService,private fb:FormBuilder,private toast:NgToastService) {}

  LogIn = this.fb.group({
    uname:['',[Validators.required]],
    pass:['',[Validators.required,Validators.minLength(5)]]
  })
  passwordText:string = 'Show Password'
  udata:any = {};
  remember:boolean = false;
  handleSubmit(){
    if(this.LogIn.valid){
      const payload= {
        email:this.login.uname.value,
        pass:this.login.pass.value
      }
      this.api.postService("http://localhost:1010/login",payload).then((resp:any)=>{
        this.udata = resp.data[0];
        if(resp.status == true ){
          this.toast.success({detail:`Welcome back ${resp.data[0].uname} !`,summary:"Login Successfully"});
          // Store Token in Localstorage
          
          localStorage.setItem("token",resp.token);
          localStorage.setItem("lkjcscsd",this.udata._id)
          this.route.navigate([`dashboard`])
          console.log(this.udata);
        }else{
          this.toast.error({detail:"User Does not exist",summary:"Login Unsuccessfull"})
        }
      }).catch((err:any)=>{
        this.toast.error({detail:err,summary:"Login Unsuccessfull"})
      })
    }else{
      this.toast.error({detail:"Something went wrong !!",summary:"Login Unsuccessfull"})
    }
  }
  displayPassword(){
    let pass = document.getElementById('pass');

    if(pass != null){
      if(pass?.attributes[1].value == 'password'){
        this.passwordText = 'Hide Password'
        pass.setAttribute("type","text");
      }else{
        this.passwordText = 'Show Password'
        pass.setAttribute("type","password");
      }
    }
  }

  get login(){
    return this.LogIn.controls;;
  }
  
}
