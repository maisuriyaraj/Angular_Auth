import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (state) => {
  let route = inject(Router)
  let token = localStorage.getItem('token');

  if(token != null){
    return true;
  }else{
    route.navigate(['/']);
    return false;
  }
};
