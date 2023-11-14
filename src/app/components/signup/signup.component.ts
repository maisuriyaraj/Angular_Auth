import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  ngOnInit(){
    if(localStorage.getItem('token') != null){
      this.route.navigate(['dashboard'])
    }
  }
  constructor(private route:Router,private api: ApiService, private fb: FormBuilder,private toast:NgToastService) {}
  passwordTxt: string = 'Show Password';
  SignIn = this.fb.group({
    uname: ['', [Validators.required]],
    uemail: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(5)]],
    cpass: ['', [Validators.required, Validators.minLength(5)]],
  });

  handleSubmit() {
    console.log(this.signin.uname.value);
    const payload = {
      uname: this.signin.uname.value,
      user_email: this.signin.uemail.value,
      user_pass: this.signin.cpass.value,
    };
    if(this.signin.cpass.value !== this.signin.pass.value){
        this.toast.error({detail:"Password must be same",summary:"Password Error",duration:2000});
        return false
    }else{
      this.api.postService("http://localhost:1010/signup",payload).then((resp)=>{
        this.toast.success({detail:"User Registered Successfully",summary:"Registration",duration:2000});
        console.log(resp);
        this.route.navigate(['login']);
        }).catch(err=>{
          this.toast.error({detail:err,summary:"Error",duration:2000});
        })
      return true;
    }

  }

  displayPassword() {
    let pass = document.getElementById('pass');
    let cpass = document.getElementById('cpass');

    if (pass != null && cpass != null) {
      if (
        pass?.attributes[1].value == 'password' &&
        cpass?.attributes[1].value == 'password'
      ) {
        this.passwordTxt = 'Hide Password';
        pass.setAttribute('type', 'text');
        cpass.setAttribute('type', 'text');
      } else {
        this.passwordTxt = 'Show Password';
        pass.setAttribute('type', 'password');
        cpass.setAttribute('type', 'password');
      }
    }
  }
  get signin() {
    return this.SignIn.controls;
  }
}
