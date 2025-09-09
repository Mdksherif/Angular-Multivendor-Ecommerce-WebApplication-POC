import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartItem, Order } from '../../models/user.model';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ChatComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent implements OnInit {
  currentCustomer: any = null;
  activeTab = 'profile';
  cartItems: CartItem[] = [];
  customerOrders: Order[] = [];
  showChatModal = false;
  chatVendorId = '';
  chatVendorName = '';
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
    this.dataService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    this.loadCustomerOrders();
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

  updateCartQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeCartItem(itemId);
    } else {
      this.dataService.updateCartQuantity(itemId, quantity);
    }
  }

  removeCartItem(itemId: string) {
    this.dataService.removeFromCart(itemId);
  }

  getCartTotal(): number {
    return this.dataService.getCartTotal();
  }

  proceedToCheckout() {
    if (!this.currentCustomer.address || this.currentCustomer.address.trim() === '') {
      alert('Please add your delivery address in your profile before placing an order.');
      this.activeTab = 'profile';
      return;
    }
    this.router.navigate(['/cart']);
  }

  loadCustomerOrders() {
    this.customerOrders = this.dataService.getCustomerOrders(this.currentCustomer.id);
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'placed': return 'warning';
      case 'packed': return 'info';
      case 'delivered': return 'success';
      default: return 'secondary';
    }
  }

  openChat(vendorId: string, vendorName: string) {
    this.chatVendorId = vendorId;
    this.chatVendorName = vendorName;
    this.showChatModal = true;
  }

  closeChatModal() {
    this.showChatModal = false;
    this.chatVendorId = '';
    this.chatVendorName = '';
  }
}