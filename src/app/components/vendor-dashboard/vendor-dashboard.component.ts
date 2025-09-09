import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product, Order, ChatConversation } from '../../models/user.model';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent implements OnInit {
  activeTab = 'profile';
  currentVendor: any;
  myProducts: Product[] = [];
  myOrders: Order[] = [];
  editMode = false;
  showPasswordModal = false;
  showChatModal = false;
  chatCustomerId = '';
  chatCustomerName = '';
  showAddProduct = false;
  showProductsList = true;
  productSearchQuery = '';
  orderSearchQuery = '';
  conversations: ChatConversation[] = [];
  editingStock: { [key: string]: boolean } = {};
  stockValues: { [key: string]: number } = {};
  selectedImages: string[] = [];
  
  newProduct = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: ''
  };
  
  editForm = {
    name: '',
    email: '',
    phone: '',
    businessName: '',
    address: ''
  };
  
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.currentVendor = this.dataService.getCurrentUser();
    if (!this.currentVendor || this.currentVendor.type !== 'vendor') {
      this.router.navigate(['/vendor/login']);
      return;
    }
    this.loadData();
    this.resetEditForm();
    this.loadConversations();
  }

  loadData() {
    this.myProducts = this.dataService.getProductsByVendor(this.currentVendor.id);
    this.myOrders = this.dataService.getOrdersByVendor(this.currentVendor.id);
  }

  addProduct() {
    const productData = {
      ...this.newProduct,
      vendorId: this.currentVendor.id,
      images: this.selectedImages.length > 0 ? this.selectedImages : [
        'https://via.placeholder.com/300x300/6366f1/ffffff?text=Product+1',
        'https://via.placeholder.com/300x300/10b981/ffffff?text=Product+2',
        'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Product+3',
        'https://via.placeholder.com/300x300/ef4444/ffffff?text=Product+4'
      ],
      status: 'active' as const
    };
    
    if (this.dataService.addProduct(productData)) {
      alert('Product added successfully!');
      this.newProduct = { name: '', description: '', price: 0, quantity: 0, category: '' };
      this.selectedImages = [];
      this.loadData();
    }
  }

  onImageSelect(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4 - this.selectedImages.length); i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  updateOrderStatus(orderId: string, status: 'placed' | 'packed' | 'delivered' | 'cancelled') {
    if (this.dataService.updateOrderStatus(orderId, status)) {
      alert('Order status updated successfully!');
      this.loadData(); // Reload to reflect stock changes if cancelled
    }
  }

  getTotalRevenue(): number {
    return this.myOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  }

  resetEditForm() {
    this.editForm = {
      name: this.currentVendor.name,
      email: this.currentVendor.email,
      phone: this.currentVendor.phone,
      businessName: this.currentVendor.businessName,
      address: this.currentVendor.address || ''
    };
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.resetEditForm();
    }
  }

  saveProfile() {
    if (this.dataService.updateVendorProfile(this.currentVendor.id, this.editForm)) {
      this.currentVendor = { ...this.currentVendor, ...this.editForm };
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

    if (this.dataService.changeVendorPassword(this.currentVendor.id, this.passwordForm.currentPassword, this.passwordForm.newPassword)) {
      alert('Password changed successfully! 🔒');
      this.closePasswordModal();
    } else {
      alert('Current password is incorrect!');
    }
  }

  loadConversations() {
    this.conversations = this.dataService.getConversationsForUser(this.currentVendor.id, 'vendor');
  }

  openChat(customerId: string, customerName: string) {
    this.chatCustomerId = customerId;
    this.chatCustomerName = customerName;
    this.showChatModal = true;
  }

  closeChatModal() {
    this.showChatModal = false;
    this.chatCustomerId = '';
    this.chatCustomerName = '';
  }

  editStock(productId: string, currentStock: number) {
    this.editingStock[productId] = true;
    this.stockValues[productId] = currentStock;
  }

  saveStock(productId: string) {
    const newStock = this.stockValues[productId];
    if (newStock >= 0) {
      this.dataService.updateProductStock(productId, newStock);
      this.editingStock[productId] = false;
      this.loadData();
      alert('Stock updated successfully! 📦');
    }
  }

  cancelStockEdit(productId: string) {
    this.editingStock[productId] = false;
    delete this.stockValues[productId];
  }

  getFilteredProducts() {
    if (!this.productSearchQuery.trim()) {
      return this.myProducts;
    }
    const query = this.productSearchQuery.toLowerCase();
    return this.myProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  getSortedAndFilteredOrders() {
    let orders = [...this.myOrders];
    
    // Sort by date (newest first) and status (placed orders first)
    orders.sort((a, b) => {
      if (a.status === 'placed' && b.status !== 'placed') return -1;
      if (b.status === 'placed' && a.status !== 'placed') return 1;
      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    });
    
    // Filter by search query
    if (!this.orderSearchQuery.trim()) {
      return orders;
    }
    
    const query = this.orderSearchQuery.toLowerCase();
    return orders.filter(order => 
      order.id.toLowerCase().includes(query) ||
      order.customerDetails.name.toLowerCase().includes(query) ||
      order.customerDetails.email.toLowerCase().includes(query) ||
      order.customerDetails.phone.toLowerCase().includes(query)
    );
  }

  toggleProductStatus(productId: string, event: any) {
    const status = event.target.checked ? 'active' : 'inactive';
    this.dataService.updateProductStatus(productId, status);
    this.loadData();
  }
}