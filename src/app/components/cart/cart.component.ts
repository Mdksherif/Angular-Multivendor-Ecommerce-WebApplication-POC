import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartItem } from '../../models/user.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  showCheckoutModal = false;
  paymentMethod = 'cod';
  currentUser: any = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.dataService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      this.dataService.updateCartQuantity(itemId, quantity);
    }
  }

  removeItem(itemId: string) {
    this.dataService.removeFromCart(itemId);
  }

  getTotal(): number {
    return this.dataService.getCartTotal();
  }

  proceedToCheckout() {
    const currentUser = this.dataService.getCurrentUser();
    if (!currentUser) {
      alert('Please login to checkout');
      this.router.navigate(['/customer/login']);
      return;
    }
    
    if (!currentUser.address || currentUser.address.trim() === '') {
      alert('Please add your delivery address in your profile before placing an order.');
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.showCheckoutModal = true;
  }

  closeCheckoutModal() {
    this.showCheckoutModal = false;
    this.paymentMethod = 'cod';
  }

  placeOrder() {
    const currentUser = this.dataService.getCurrentUser();
    if (!currentUser || this.cartItems.length === 0) return;

    // Place order for each cart item
    this.cartItems.forEach(item => {
      const orderData = {
        customerId: currentUser.id,
        vendorId: item.product.vendorId,
        productId: item.productId,
        quantity: item.quantity,
        totalAmount: item.product.price * item.quantity,
        status: 'placed' as const,
        paymentMethod: this.paymentMethod as 'cod' | 'upi',
        customerDetails: currentUser,
        productDetails: item.product
      };
      this.dataService.placeOrder(orderData);
    });

    this.dataService.clearCart();
    this.showCheckoutModal = false;
    alert('Orders placed successfully! 🎉');
    this.router.navigate(['/home']);
  }
}