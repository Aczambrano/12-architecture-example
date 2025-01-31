import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-aside',
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userRoles: string[] = [];

  isSidebarCollapsed = false; 
  username: string | null = null;
  usernameSubscription: Subscription;

  constructor(private router: Router
    //, private authService: AuthService
  ) {
    //this.usernameSubscription = this.authService.username$.subscribe(username => {
    //  this.username = username
    //})

  }


  register() {
    this.router.navigate(['/dashboard/register']);
  }

  handleToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; 
    this.toggleSidebar.emit(); 
  }

  ngOnDestroy(): void {
    if(this.usernameSubscription) {
        this.usernameSubscription.unsubscribe()
    }
  }

  isAdmin(): boolean {
    return this.userRoles.includes('ROLE_ADMIN');
  }
  isUser(): boolean {
    return this.userRoles.includes('ROLE_USER');
  }
}
