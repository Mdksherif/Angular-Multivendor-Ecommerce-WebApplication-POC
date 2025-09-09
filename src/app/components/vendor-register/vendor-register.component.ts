import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-vendor-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vendor-register.component.html',
  styleUrl: './vendor-register.component.scss'
})
export class VendorRegisterComponent {
  vendor = {
    name: '',
    email: '',
    phone: '',
    businessName: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit() {
    if (this.dataService.registerVendor(this.vendor)) {
      alert('Registration successful! Please login.');
      this.router.navigate(['/vendor/login']);
    }
  }
}