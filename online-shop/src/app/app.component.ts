import { Component } from '@angular/core';
import { Role } from './models/role.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Online Shop';
  isA;

  constructor(private authenticationService: AuthenticationService) {}

  isAdmin(): boolean {
    const currentUserRole: Role = this.authenticationService.getCurrentUserRole();
    return currentUserRole === 'Admin';
  }

  isCustomer(): boolean {
    const currentUserRole: Role = this.authenticationService.getCurrentUserRole();
    return currentUserRole === 'Customer';
  }
}
