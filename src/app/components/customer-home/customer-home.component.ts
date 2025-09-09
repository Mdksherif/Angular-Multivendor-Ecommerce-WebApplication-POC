import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/user.model';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class CustomerHomeComponent implements OnInit {
  products: Product[] = [];
  currentCustomer: any;
  selectedCategory = 'All';
  searchQuery = '';
  searchResults: Product[] = [];
  showSearchResults = false;
  
  categories = [
    { name: 'All', icon: '🛍️', color: 'primary' },
    { name: 'Electronics', icon: '📱', color: 'blue' },
    { name: 'Fashion', icon: '👕', color: 'pink' },
    { name: 'Furniture', icon: '🪑', color: 'brown' },
    { name: 'Mobiles', icon: '📱', color: 'green' },
    { name: 'Books', icon: '📚', color: 'orange' },
    { name: 'Home', icon: '🏠', color: 'purple' },
    { name: 'Sports', icon: '⚽', color: 'red' }
  ];

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.currentCustomer = this.dataService.getCurrentUser();
    this.products = this.dataService.getActiveProducts();
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  addToCart(productId: string, event: Event) {
    event.stopPropagation();
    
    if (!this.currentCustomer) {
      alert('Please login to add items to cart');
      this.router.navigate(['/customer/login']);
      return;
    }
    
    if (this.dataService.addToCart(productId, 1)) {
      alert('Added to cart! 🛒');
    }
  }

  selectCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  getFilteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  getCategoryCount(categoryName: string): number {
    if (categoryName === 'All') {
      return this.products.length;
    }
    return this.products.filter(product => product.category === categoryName).length;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchProducts();
      this.showSearchResults = true;
    } else {
      this.showSearchResults = false;
    }
  }

  searchProducts() {
    const query = this.searchQuery.toLowerCase().trim();
    this.searchResults = this.products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  clearSearch() {
    this.searchQuery = '';
    this.showSearchResults = false;
    this.searchResults = [];
  }

  searchByCategory(category: string) {
    this.searchQuery = category;
    this.onSearch();
  }
}