import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.scss'
})
export class CustomerRegisterComponent {
  customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit() {
    if (this.dataService.registerCustomer(this.customer)) {
      alert('Registration successful! Please login.');
      this.router.navigate(['/customer/login']);
    }
  }
}