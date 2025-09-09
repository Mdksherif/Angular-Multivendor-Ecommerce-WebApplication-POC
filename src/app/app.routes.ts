import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'vendor/register', 
    loadComponent: () => import('./components/vendor-register/vendor-register.component').then(m => m.VendorRegisterComponent)
  },
  { 
    path: 'vendor/login', 
    loadComponent: () => import('./components/vendor-login/vendor-login.component').then(m => m.VendorLoginComponent)
  },
  { 
    path: 'vendor/dashboard', 
    loadComponent: () => import('./components/vendor-dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent)
  },
  { 
    path: 'customer/register', 
    loadComponent: () => import('./components/customer-register/customer-register.component').then(m => m.CustomerRegisterComponent)
  },
  { 
    path: 'customer/login', 
    loadComponent: () => import('./components/customer-login/customer-login.component').then(m => m.CustomerLoginComponent)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./components/customer-home/customer-home.component').then(m => m.CustomerHomeComponent)
  },
  { 
    path: 'product/:id', 
    loadComponent: () => import('./components/product-view/product-view.component').then(m => m.ProductViewComponent)
  },
  { 
    path: 'products', 
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent)
  }
];