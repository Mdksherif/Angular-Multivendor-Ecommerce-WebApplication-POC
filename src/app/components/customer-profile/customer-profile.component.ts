import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit {
  currentCustomer: any = null;
  editMode = false;
  showPasswordModal = false;
  
  editForm = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.currentCustomer = this.dataService.getCurrentUser();
    if (!this.currentCustomer || this.currentCustomer.type !== 'customer') {
      this.router.navigate(['/customer/login']);
      return;
    }
    this.resetEditForm();
  }

  resetEditForm() {
    this.editForm = {
      name: this.currentCustomer.name,
      email: this.currentCustomer.email,
      phone: this.currentCustomer.phone,
      address: this.currentCustomer.address
    };
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.resetEditForm();
    }
  }

  saveProfile() {
    if (this.dataService.updateCustomerProfile(this.currentCustomer.id, this.editForm)) {
      this.currentCustomer = { ...this.currentCustomer, ...this.editForm };
      this.editMode = false;
      alert('Profile updated successfully! ✅');
    } else {
      alert('Failed to update profile');
    }
  }

  openPasswordModal() {
    this.showPasswordModal = true;
    this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  closePasswordModal() {
    this.showPasswordModal = false;
    this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (this.passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (this.dataService.changeCustomerPassword(this.currentCustomer.id, this.passwordForm.currentPassword, this.passwordForm.newPassword)) {
      alert('Password changed successfully! 🔒');
      this.closePasswordModal();
    } else {
      alert('Current password is incorrect!');
    }
  }
}