import { Component } from '@angular/core';
import { SignInRequest } from '../models/sign-in-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin-jwt',
  templateUrl: './sigin-jwt.component.html',
  styleUrls: ['./sigin-jwt.component.css']
})
export class SiginJwtComponent {
 signInRequest : SignInRequest;

constructor(private authService: AuthService,
  private cookieService: CookieService,
  private router: Router
) {
  this.signInRequest = {
    email: '',
    password: ''
  };
}

onSubmit(): void {
    this.authService.login(this.signInRequest).subscribe({
      next: (response) => {
        // Set auth cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
          undefined,'/',undefined,true,'Strict');

        // Set user in auth service
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
        
        // redirect to home page
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log('Error logging in', err);
      }
    });
  }

}
