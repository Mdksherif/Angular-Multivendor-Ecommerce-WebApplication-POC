import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {
  credentials = {
    emailOrPhone: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit() {
    const customer = this.dataService.loginCustomer(this.credentials.emailOrPhone, this.credentials.password);
    if (customer) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials!');
    }
  }
}