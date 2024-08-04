import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: User;
  userLoggedIn = false;

  // Constructor 
  constructor(private authService: AuthService,
    private router: Router
  ) { }

  // Methods
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
      }
    });
    
    this.user = this.authService.getUser();
    this.checkUser(this.user);
  }

  checkUser( user: User | undefined): void {
    if (user) {
      this.userLoggedIn = true;
    }
  }

  // Logout method
  onLogout(): void {
    this.authService.logout();
    this.userLoggedIn = false;
    this.router.navigateByUrl('/');
  }

}
