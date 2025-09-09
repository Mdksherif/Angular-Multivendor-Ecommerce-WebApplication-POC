import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/user.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCustomer: any;
  selectedCategory = 'All';
  
  categories = [
    { name: 'All', icon: '🛍️' },
    { name: 'Electronics', icon: '📱' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Furniture', icon: '🪑' },
    { name: 'Mobiles', icon: '📱' },
    { name: 'Books', icon: '📚' },
    { name: 'Home', icon: '🏠' },
    { name: 'Sports', icon: '⚽' }
  ];

  constructor(
    private dataService: DataService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentCustomer = this.dataService.getCurrentUser();
    this.products = this.dataService.getActiveProducts();
    
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'All';
      this.filterProducts();
    });
  }

  filterProducts() {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.router.navigate(['/products'], { queryParams: { category } });
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
}