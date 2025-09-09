import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-vendor-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vendor-login.component.html',
  styleUrl: './vendor-login.component.scss'
})
export class VendorLoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit() {
    const vendor = this.dataService.loginVendor(this.credentials.email, this.credentials.password);
    if (vendor) {
      this.router.navigate(['/vendor/dashboard']);
    } else {
      alert('Invalid credentials!');
    }
  }
}