import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentUser: any = null;
  isMenuOpen = false;
  cartItemCount = 0;

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.dataService.cart$.subscribe(cart => {
      this.cartItemCount = this.dataService.getCartItemCount();
    });
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}