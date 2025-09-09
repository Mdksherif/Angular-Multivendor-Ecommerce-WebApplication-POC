import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/user.model';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
  product: Product | null = null;
  selectedImage = '';
  purchaseQuantity = 1;
  showPaymentModal = false;
  showSuccessModal = false;
  showToast = false;
  paymentMethod = 'cod';
  orderId = '';
  currentCustomer: any;
  editingAddress = false;
  tempAddress = '';
  tempPhone = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.currentCustomer = this.dataService.getCurrentUser();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.dataService.products.find(p => p.id === productId) || null;
      if (this.product) {
        this.selectedImage = this.product.images[0];
      }
    }
  }

  buyNow() {
    if (!this.currentCustomer) {
      alert('Please login to place an order');
      this.router.navigate(['/customer/login']);
      return;
    }
    
    if (!this.currentCustomer.address || this.currentCustomer.address.trim() === '') {
      alert('Please add your delivery address in your profile before placing an order.');
      this.router.navigate(['/dashboard']);
      return;
    }
    
    // Check stock availability before showing payment modal
    if (!this.product || this.product.quantity < this.purchaseQuantity) {
      alert(`Sorry, only ${this.product?.quantity || 0} items available in stock!`);
      return;
    }
    
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    this.paymentMethod = 'cod';
  }

  proceedOrder() {
    if (!this.product || !this.currentCustomer) return;

    // Check stock availability
    if (this.product.quantity < this.purchaseQuantity) {
      alert(`Sorry, only ${this.product.quantity} items available in stock!`);
      return;
    }

    const orderData = {
      customerId: this.currentCustomer.id,
      vendorId: this.product.vendorId,
      productId: this.product.id,
      quantity: this.purchaseQuantity,
      totalAmount: this.getTotalAmount(),
      status: 'placed' as const,
      paymentMethod: this.paymentMethod as 'cod' | 'upi',
      customerDetails: this.currentCustomer,
      productDetails: this.product
    };

    if (this.dataService.placeOrder(orderData)) {
      this.orderId = (this.dataService.orders.length).toString();
      this.showPaymentModal = false;
      this.showSuccessModal = true;
    } else {
      alert('Failed to place order. Please try again.');
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/home']);
  }

  getTotalAmount(): number {
    return this.product ? this.product.price * this.purchaseQuantity : 0;
  }

  addToCart() {
    if (!this.currentCustomer) {
      alert('Please login to add items to cart');
      this.router.navigate(['/customer/login']);
      return;
    }
    
    if (this.product && this.dataService.addToCart(this.product.id, this.purchaseQuantity)) {
      alert(`Added ${this.purchaseQuantity} item(s) to cart! 🛒`);
    }
  }

  editAddress() {
    this.editingAddress = true;
    this.tempAddress = this.currentCustomer.address;
    this.tempPhone = this.currentCustomer.phone;
  }

  saveAddress() {
    if (this.tempAddress.trim() && this.tempPhone.trim()) {
      this.dataService.updateCustomerProfile(this.currentCustomer.id, { 
        address: this.tempAddress,
        phone: this.tempPhone 
      });
      this.currentCustomer.address = this.tempAddress;
      this.currentCustomer.phone = this.tempPhone;
      this.editingAddress = false;
      alert('Address and phone updated successfully! 📍');
    }
  }

  cancelAddressEdit() {
    this.editingAddress = false;
    this.tempAddress = '';
    this.tempPhone = '';
  }
}