import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vendor, Customer, Product, Order, CartItem, ChatConversation, ChatMessage } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  // Hardcoded data
  vendors: Vendor[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'vendor@test.com',
      phone: '9876543210',
      password: 'password',
      businessName: 'Tech Store'
    }
  ];

  customers: Customer[] = [
    {
      id: '1',
      name: 'Jane Smith',
      email: 'customer@test.com',
      phone: '9876543211',
      password: 'password',
      address: '123 Main St, City'
    }
  ];

  products: Product[] = [
    {
      id: '1',
      vendorId: '1',
      name: 'Smartphone',
      description: 'Latest Android smartphone with 128GB storage',
      price: 25000,
      quantity: 50,
      images: [
        'https://picsum.photos/360/800?random=1',
        'https://picsum.photos/360/800?random=1',
        'https://picsum.photos/360/800?random=1',
        'https://picsum.photos/360/800?random=1',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '2',
      vendorId: '1',
      name: 'Laptop',
      description: 'High-performance laptop for gaming and work',
      price: 65000,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=2',
        'https://picsum.photos/360/800?random=2',
        'https://picsum.photos/360/800?random=2',
        'https://picsum.photos/360/800?random=2',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '3',
      vendorId: '1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones',
      price: 8500,
      quantity: 75,
      images: [
        'https://picsum.photos/360/800?random=3',
        'https://picsum.photos/360/800?random=3',
        'https://picsum.photos/360/800?random=3',
        'https://picsum.photos/360/800?random=3',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '4',
      vendorId: '1',
      name: 'Designer T-Shirt',
      description: 'Premium cotton designer t-shirt for casual wear',
      price: 1200,
      quantity: 100,
      images: [
        'https://picsum.photos/360/800?random=4',
        'https://picsum.photos/360/800?random=4',
        'https://picsum.photos/360/800?random=4',
        'https://picsum.photos/360/800?random=4',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '5',
      vendorId: '1',
      name: 'Office Chair',
      description: 'Ergonomic office chair with lumbar support',
      price: 12000,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=5',
        'https://picsum.photos/360/800?random=5',
        'https://picsum.photos/360/800?random=5',
        'https://picsum.photos/360/800?random=5',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '6',
      vendorId: '1',
      name: 'Tablet',
      description: '10-inch tablet with high-resolution display',
      price: 18000,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=6',
        'https://picsum.photos/360/800?random=6',
        'https://picsum.photos/360/800?random=6',
        'https://picsum.photos/360/800?random=6',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '7',
      vendorId: '1',
      name: 'Programming Book',
      description: 'Complete guide to modern web development',
      price: 850,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=7',
        'https://picsum.photos/360/800?random=7',
        'https://picsum.photos/360/800?random=7',
        'https://picsum.photos/360/800?random=7',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '8',
      vendorId: '1',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 15000,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=8',
        'https://picsum.photos/360/800?random=8',
        'https://picsum.photos/360/800?random=8',
        'https://picsum.photos/360/800?random=8',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '9',
      vendorId: '1',
      name: 'Coffee Table',
      description: 'Modern wooden coffee table for living room',
      price: 8500,
      quantity: 20,
      images: [
        'https://picsum.photos/360/800?random=9',
        'https://picsum.photos/360/800?random=9',
        'https://picsum.photos/360/800?random=9',
        'https://picsum.photos/360/800?random=9',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '10',
      vendorId: '1',
      name: 'Running Shoes',
      description: 'Professional running shoes with advanced cushioning',
      price: 4500,
      quantity: 80,
      images: [
        'https://picsum.photos/360/800?random=10',
        'https://picsum.photos/360/800?random=10',
        'https://picsum.photos/360/800?random=10',
        'https://picsum.photos/360/800?random=10',
      ],
      category: 'Sports',
      status: 'active' as const
    },
  
    {
      id: '11',
      vendorId: '1',
      name: 'Gaming Mouse',
      description: 'High-precision gaming mouse with RGB lighting',
      price: 3500,
      quantity: 45,
      images: [
        'https://picsum.photos/360/800?random=11',
        'https://picsum.photos/360/800?random=11',
        'https://picsum.photos/360/800?random=11',
        'https://picsum.photos/360/800?random=11',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '12',
      vendorId: '1',
      name: 'Bluetooth Speaker',
      description: 'Portable wireless speaker with deep bass',
      price: 2800,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=12',
        'https://picsum.photos/360/800?random=12',
        'https://picsum.photos/360/800?random=12',
        'https://picsum.photos/360/800?random=12',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '13',
      vendorId: '1',
      name: 'Webcam HD',
      description: '1080p HD webcam for video calls and streaming',
      price: 4200,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=13',
        'https://picsum.photos/360/800?random=13',
        'https://picsum.photos/360/800?random=13',
        'https://picsum.photos/360/800?random=13',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '14',
      vendorId: '1',
      name: 'Power Bank',
      description: '20000mAh portable power bank with fast charging',
      price: 1800,
      quantity: 70,
      images: [
        'https://picsum.photos/360/800?random=14',
        'https://picsum.photos/360/800?random=14',
        'https://picsum.photos/360/800?random=14',
        'https://picsum.photos/360/800?random=14',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '15',
      vendorId: '1',
      name: 'USB Cable',
      description: 'Premium USB-C to USB-A cable 2 meters',
      price: 450,
      quantity: 100,
      images: [
        'https://picsum.photos/360/800?random=15',
        'https://picsum.photos/360/800?random=15',
        'https://picsum.photos/360/800?random=15',
        'https://picsum.photos/360/800?random=15',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    {
      id: '16',
      vendorId: '1',
      name: 'Keyboard Mechanical',
      description: 'RGB mechanical keyboard for gaming and typing',
      price: 6500,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=16',
        'https://picsum.photos/360/800?random=16',
        'https://picsum.photos/360/800?random=16',
        'https://picsum.photos/360/800?random=16',
      ],
      category: 'Electronics',
      status: 'active' as const
    },
    // Fashion (9 more)
    {
      id: '17',
      vendorId: '1',
      name: 'Jeans',
      description: 'Premium denim jeans with perfect fit',
      price: 2500,
      quantity: 50,
      images: [
        'https://picsum.photos/360/800?random=17',
        'https://picsum.photos/360/800?random=17',
        'https://picsum.photos/360/800?random=17',
        'https://picsum.photos/360/800?random=17',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '18',
      vendorId: '1',
      name: 'Dress Shirt',
      description: 'Formal cotton dress shirt for office wear',
      price: 1800,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=18',
        'https://picsum.photos/360/800?random=18',
        'https://picsum.photos/360/800?random=18',
        'https://picsum.photos/360/800?random=18',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '19',
      vendorId: '1',
      name: 'Sneakers',
      description: 'Casual sneakers for everyday comfort',
      price: 3200,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=19',
        'https://picsum.photos/360/800?random=19',
        'https://picsum.photos/360/800?random=19',
        'https://picsum.photos/360/800?random=19',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '20',
      vendorId: '1',
      name: 'Jacket',
      description: 'Stylish winter jacket with warm lining',
      price: 4500,
      quantity: 20,
      images: [
        'https://picsum.photos/360/800?random=20',
        'https://picsum.photos/360/800?random=20',
        'https://picsum.photos/360/800?random=20',
        'https://picsum.photos/360/800?random=20',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '21',
      vendorId: '1',
      name: 'Watch',
      description: 'Elegant analog watch with leather strap',
      price: 5500,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=21',
        'https://picsum.photos/360/800?random=21',
        'https://picsum.photos/360/800?random=21',
        'https://picsum.photos/360/800?random=21',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '22',
      vendorId: '1',
      name: 'Sunglasses',
      description: 'UV protection sunglasses with polarized lenses',
      price: 2200,
      quantity: 45,
      images: [
        'https://picsum.photos/360/800?random=22',
        'https://picsum.photos/360/800?random=22',
        'https://picsum.photos/360/800?random=22',
        'https://picsum.photos/360/800?random=22',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '23',
      vendorId: '1',
      name: 'Belt',
      description: 'Genuine leather belt with metal buckle',
      price: 1500,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=23',
        'https://picsum.photos/360/800?random=23',
        'https://picsum.photos/360/800?random=23',
        'https://picsum.photos/360/800?random=23',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '24',
      vendorId: '1',
      name: 'Cap',
      description: 'Baseball cap with adjustable strap',
      price: 800,
      quantity: 80,
      images: [
        'https://picsum.photos/360/800?random=24',
        'https://picsum.photos/360/800?random=24',
        'https://picsum.photos/360/800?random=24',
        'https://picsum.photos/360/800?random=24',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    {
      id: '25',
      vendorId: '1',
      name: 'Scarf',
      description: 'Soft wool scarf for winter warmth',
      price: 1200,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=25',
        'https://picsum.photos/360/800?random=25',
        'https://picsum.photos/360/800?random=25',
        'https://picsum.photos/360/800?random=25',
      ],
      category: 'Fashion',
      status: 'active' as const
    },
    // Furniture (8 more)
    {
      id: '26',
      vendorId: '1',
      name: 'Dining Table',
      description: '6-seater wooden dining table',
      price: 25000,
      quantity: 10,
      images: [
        'https://picsum.photos/360/800?random=26',
        'https://picsum.photos/360/800?random=26',
        'https://picsum.photos/360/800?random=26',
        'https://picsum.photos/360/800?random=26',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '27',
      vendorId: '1',
      name: 'Sofa Set',
      description: '3-seater comfortable sofa with cushions',
      price: 35000,
      quantity: 8,
      images: [
        'https://picsum.photos/360/800?random=27',
        'https://picsum.photos/360/800?random=27',
        'https://picsum.photos/360/800?random=27',
        'https://picsum.photos/360/800?random=27',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '28',
      vendorId: '1',
      name: 'Bookshelf',
      description: '5-tier wooden bookshelf for storage',
      price: 8500,
      quantity: 15,
      images: [
        'https://picsum.photos/360/800?random=28',
        'https://picsum.photos/360/800?random=28',
        'https://picsum.photos/360/800?random=28',
        'https://picsum.photos/360/800?random=28',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '29',
      vendorId: '1',
      name: 'Bed Frame',
      description: 'Queen size wooden bed frame',
      price: 18000,
      quantity: 12,
      images: [
        'https://picsum.photos/360/800?random=29',
        'https://picsum.photos/360/800?random=29',
        'https://picsum.photos/360/800?random=29',
        'https://picsum.photos/360/800?random=29',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '30',
      vendorId: '1',
      name: 'Wardrobe',
      description: '3-door wardrobe with mirror',
      price: 22000,
      quantity: 6,
      images: [
        'https://picsum.photos/360/800?random=30',
        'https://picsum.photos/360/800?random=30',
        'https://picsum.photos/360/800?random=30',
        'https://picsum.photos/360/800?random=30',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '31',
      vendorId: '1',
      name: 'TV Stand',
      description: 'Modern TV stand with storage',
      price: 6500,
      quantity: 20,
      images: [
        'https://picsum.photos/360/800?random=31',
        'https://picsum.photos/360/800?random=31',
        'https://picsum.photos/360/800?random=31',
        'https://picsum.photos/360/800?random=31',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '32',
      vendorId: '1',
      name: 'Study Desk',
      description: 'Compact study desk with drawers',
      price: 9500,
      quantity: 18,
      images: [
        'https://picsum.photos/360/800?random=32',
        'https://picsum.photos/360/800?random=32',
        'https://picsum.photos/360/800?random=32',
        'https://picsum.photos/360/800?random=32',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    {
      id: '33',
      vendorId: '1',
      name: 'Dining Chairs',
      description: 'Set of 4 comfortable dining chairs',
      price: 12000,
      quantity: 15,
      images: [
        'https://picsum.photos/360/800?random=33',
        'https://picsum.photos/360/800?random=33',
        'https://picsum.photos/360/800?random=33',
        'https://picsum.photos/360/800?random=33',
      ],
      category: 'Furniture',
      status: 'active' as const
    },
    // Mobiles (9 more)
    {
      id: '34',
      vendorId: '1',
      name: 'iPhone',
      description: 'Latest iPhone with advanced camera',
      price: 75000,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=34',
        'https://picsum.photos/360/800?random=34',
        'https://picsum.photos/360/800?random=34',
        'https://picsum.photos/360/800?random=34',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '35',
      vendorId: '1',
      name: 'Samsung Galaxy',
      description: 'Samsung flagship with S Pen',
      price: 65000,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=35',
        'https://picsum.photos/360/800?random=35',
        'https://picsum.photos/360/800?random=35',
        'https://picsum.photos/360/800?random=35',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '36',
      vendorId: '1',
      name: 'OnePlus',
      description: 'OnePlus with fast charging technology',
      price: 45000,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=36',
        'https://picsum.photos/360/800?random=36',
        'https://picsum.photos/360/800?random=36',
        'https://picsum.photos/360/800?random=36',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '37',
      vendorId: '1',
      name: 'Xiaomi',
      description: 'Xiaomi with high-performance processor',
      price: 25000,
      quantity: 50,
      images: [
        'https://picsum.photos/360/800?random=37',
        'https://picsum.photos/360/800?random=37',
        'https://picsum.photos/360/800?random=37',
        'https://picsum.photos/360/800?random=37',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '38',
      vendorId: '1',
      name: 'Realme',
      description: 'Realme with AI photography',
      price: 18000,
      quantity: 45,
      images: [
        'https://picsum.photos/360/800?random=38',
        'https://picsum.photos/360/800?random=38',
        'https://picsum.photos/360/800?random=38',
        'https://picsum.photos/360/800?random=38',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '39',
      vendorId: '1',
      name: 'Vivo',
      description: 'Vivo with selfie-focused camera',
      price: 22000,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=39',
        'https://picsum.photos/360/800?random=39',
        'https://picsum.photos/360/800?random=39',
        'https://picsum.photos/360/800?random=39',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '40',
      vendorId: '1',
      name: 'Oppo',
      description: 'Oppo with fast charging and sleek design',
      price: 28000,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=40',
        'https://picsum.photos/360/800?random=40',
        'https://picsum.photos/360/800?random=40',
        'https://picsum.photos/360/800?random=40',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '41',
      vendorId: '1',
      name: 'Google Pixel',
      description: 'Google Pixel with pure Android experience',
      price: 55000,
      quantity: 20,
      images: [
        'https://picsum.photos/360/800?random=41',
        'https://picsum.photos/360/800?random=41',
        'https://picsum.photos/360/800?random=41',
        'https://picsum.photos/360/800?random=41',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    {
      id: '42',
      vendorId: '1',
      name: 'iPad',
      description: 'Apple iPad with Apple Pencil support',
      price: 35000,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=42',
        'https://picsum.photos/360/800?random=42',
        'https://picsum.photos/360/800?random=42',
        'https://picsum.photos/360/800?random=42',
      ],
      category: 'Mobiles',
      status: 'active' as const
    },
    // Books (9 more)
    {
      id: '43',
      vendorId: '1',
      name: 'Fiction Novel',
      description: 'Bestselling fiction novel by renowned author',
      price: 450,
      quantity: 100,
      images: [
        'https://picsum.photos/360/800?random=43',
        'https://picsum.photos/360/800?random=43',
        'https://picsum.photos/360/800?random=43',
        'https://picsum.photos/360/800?random=43',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '44',
      vendorId: '1',
      name: 'Science Textbook',
      description: 'Comprehensive science textbook for students',
      price: 1200,
      quantity: 75,
      images: [
        'https://picsum.photos/360/800?random=44',
        'https://picsum.photos/360/800?random=44',
        'https://picsum.photos/360/800?random=44',
        'https://picsum.photos/360/800?random=44',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '45',
      vendorId: '1',
      name: 'History Book',
      description: 'World history book with detailed illustrations',
      price: 950,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=45',
        'https://picsum.photos/360/800?random=45',
        'https://picsum.photos/360/800?random=45',
        'https://picsum.photos/360/800?random=45',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '46',
      vendorId: '1',
      name: 'Cookbook',
      description: 'Recipe book with international cuisines',
      price: 750,
      quantity: 80,
      images: [
        'https://picsum.photos/360/800?random=46',
        'https://picsum.photos/360/800?random=46',
        'https://picsum.photos/360/800?random=46',
        'https://picsum.photos/360/800?random=46',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '47',
      vendorId: '1',
      name: 'Self Help',
      description: 'Motivational self-help book for personal growth',
      price: 650,
      quantity: 90,
      images: [
        'https://picsum.photos/360/800?random=47',
        'https://picsum.photos/360/800?random=47',
        'https://picsum.photos/360/800?random=47',
        'https://picsum.photos/360/800?random=47',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '48',
      vendorId: '1',
      name: 'Biography',
      description: 'Inspiring biography of successful entrepreneur',
      price: 850,
      quantity: 70,
      images: [
        'https://picsum.photos/360/800?random=48',
        'https://picsum.photos/360/800?random=48',
        'https://picsum.photos/360/800?random=48',
        'https://picsum.photos/360/800?random=48',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '49',
      vendorId: '1',
      name: 'Poetry Collection',
      description: 'Beautiful collection of modern poetry',
      price: 550,
      quantity: 65,
      images: [
        'https://picsum.photos/360/800?random=49',
        'https://picsum.photos/360/800?random=49',
        'https://picsum.photos/360/800?random=49',
        'https://picsum.photos/360/800?random=49',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '50',
      vendorId: '1',
      name: 'Art Book',
      description: 'Coffee table book featuring famous artworks',
      price: 1500,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=50',
        'https://picsum.photos/360/800?random=50',
        'https://picsum.photos/360/800?random=50',
        'https://picsum.photos/360/800?random=50',
      ],
      category: 'Books',
      status: 'active' as const
    },
    {
      id: '51',
      vendorId: '1',
      name: 'Travel Guide',
      description: 'Complete travel guide for popular destinations',
      price: 900,
      quantity: 55,
      images: [
        'https://picsum.photos/360/800?random=51',
        'https://picsum.photos/360/800?random=51',
        'https://picsum.photos/360/800?random=51',
        'https://picsum.photos/360/800?random=51',
      ],
      category: 'Books',
      status: 'active' as const
    },
    // Home (10 products)
    {
      id: '52',
      vendorId: '1',
      name: 'Air Purifier',
      description: 'HEPA air purifier for clean indoor air',
      price: 15000,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=52',
        'https://picsum.photos/360/800?random=52',
        'https://picsum.photos/360/800?random=52',
        'https://picsum.photos/360/800?random=52',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '53',
      vendorId: '1',
      name: 'Vacuum Cleaner',
      description: 'Powerful vacuum cleaner for deep cleaning',
      price: 12000,
      quantity: 20,
      images: [
        'https://picsum.photos/360/800?random=53',
        'https://picsum.photos/360/800?random=53',
        'https://picsum.photos/360/800?random=53',
        'https://picsum.photos/360/800?random=53',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '54',
      vendorId: '1',
      name: 'Microwave Oven',
      description: 'Digital microwave oven with multiple settings',
      price: 8500,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=213',
        'https://picsum.photos/360/800?random=214',
        'https://picsum.photos/360/800?random=215',
        'https://picsum.photos/360/800?random=216',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '55',
      vendorId: '1',
      name: 'Blender',
      description: 'High-speed blender for smoothies and juices',
      price: 3500,
      quantity: 45,
      images: [
        'https://picsum.photos/360/800?random=217',
        'https://picsum.photos/360/800?random=218',
        'https://picsum.photos/360/800?random=219',
        'https://picsum.photos/360/800?random=220',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '56',
      vendorId: '1',
      name: 'Rice Cooker',
      description: 'Automatic rice cooker with steamer',
      price: 2800,
      quantity: 50,
      images: [
        'https://picsum.photos/360/800?random=221',
        'https://picsum.photos/360/800?random=222',
        'https://picsum.photos/360/800?random=223',
        'https://picsum.photos/360/800?random=224',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '57',
      vendorId: '1',
      name: 'Iron',
      description: 'Steam iron with non-stick soleplate',
      price: 1800,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=225',
        'https://picsum.photos/360/800?random=226',
        'https://picsum.photos/360/800?random=227',
        'https://picsum.photos/360/800?random=228',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '58',
      vendorId: '1',
      name: 'Fan',
      description: 'Ceiling fan with remote control',
      price: 4500,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=229',
        'https://picsum.photos/360/800?random=230',
        'https://picsum.photos/360/800?random=231',
        'https://picsum.photos/360/800?random=232',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '59',
      vendorId: '1',
      name: 'Water Filter',
      description: 'Multi-stage water purification system',
      price: 6500,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=233',
        'https://picsum.photos/360/800?random=234',
        'https://picsum.photos/360/800?random=235',
        'https://picsum.photos/360/800?random=236',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '60',
      vendorId: '1',
      name: 'Toaster',
      description: '4-slice toaster with browning control',
      price: 2200,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=237',
        'https://picsum.photos/360/800?random=238',
        'https://picsum.photos/360/800?random=239',
        'https://picsum.photos/360/800?random=240',
      ],
      category: 'Home',
      status: 'active' as const
    },
    {
      id: '61',
      vendorId: '1',
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with timer',
      price: 5500,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=61',
        'https://picsum.photos/360/800?random=61',
        'https://picsum.photos/360/800?random=61',
        'https://picsum.photos/360/800?random=61',
      ],
      category: 'Home',
      status: 'active' as const
    },
    // Sports (9 more)
    {
      id: '62',
      vendorId: '1',
      name: 'Football',
      description: 'Professional football for outdoor games',
      price: 1200,
      quantity: 60,
      images: [
        'https://picsum.photos/360/800?random=62',
        'https://picsum.photos/360/800?random=62',
        'https://picsum.photos/360/800?random=62',
        'https://picsum.photos/360/800?random=62',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '63',
      vendorId: '1',
      name: 'Cricket Bat',
      description: 'Willow cricket bat for professional play',
      price: 3500,
      quantity: 25,
      images: [
        'https://picsum.photos/360/800?random=63',
        'https://picsum.photos/360/800?random=63',
        'https://picsum.photos/360/800?random=63',
        'https://picsum.photos/360/800?random=63',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '64',
      vendorId: '1',
      name: 'Tennis Racket',
      description: 'Lightweight tennis racket with grip',
      price: 2800,
      quantity: 35,
      images: [
        'https://picsum.photos/360/800?random=64',
        'https://picsum.photos/360/800?random=64',
        'https://picsum.photos/360/800?random=64',
        'https://picsum.photos/360/800?random=64',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '65',
      vendorId: '1',
      name: 'Basketball',
      description: 'Official size basketball for indoor/outdoor',
      price: 1500,
      quantity: 50,
      images: [
        'https://picsum.photos/360/800?random=65',
        'https://picsum.photos/360/800?random=65',
        'https://picsum.photos/360/800?random=65',
        'https://picsum.photos/360/800?random=65',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '66',
      vendorId: '1',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for exercise and meditation',
      price: 800,
      quantity: 70,
      images: [
        'https://picsum.photos/360/800?random=66',
        'https://picsum.photos/360/800?random=66',
        'https://picsum.photos/360/800?random=66',
        'https://picsum.photos/360/800?random=66',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '67',
      vendorId: '1',
      name: 'Dumbbells',
      description: 'Adjustable dumbbells for strength training',
      price: 4500,
      quantity: 30,
      images: [
        'https://picsum.photos/360/800?random=67',
        'https://picsum.photos/360/800?random=67',
        'https://picsum.photos/360/800?random=67',
        'https://picsum.photos/360/800?random=67',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '68',
      vendorId: '1',
      name: 'Badminton Set',
      description: 'Complete badminton set with rackets and shuttles',
      price: 2200,
      quantity: 40,
      images: [
        'https://picsum.photos/360/800?random=68',
        'https://picsum.photos/360/800?random=68',
        'https://picsum.photos/360/800?random=68',
        'https://picsum.photos/360/800?random=68',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '69',
      vendorId: '1',
      name: 'Cycling Helmet',
      description: 'Safety helmet for cycling with ventilation',
      price: 1800,
      quantity: 45,
      images: [
        'https://picsum.photos/360/800?random=69',
        'https://picsum.photos/360/800?random=69',
        'https://picsum.photos/360/800?random=69',
        'https://picsum.photos/360/800?random=69',
      ],
      category: 'Sports',
      status: 'active' as const
    },
    {
      id: '70',
      vendorId: '1',
      name: 'Swimming Goggles',
      description: 'Anti-fog swimming goggles with UV protection',
      price: 650,
      quantity: 80,
      images: [
        'https://picsum.photos/360/800?random=70',
        'https://picsum.photos/360/800?random=70',
        'https://picsum.photos/360/800?random=70',
        'https://picsum.photos/360/800?random=70',
      ],
      category: 'Sports',
      status: 'active' as const
    }
  ];

  orders: Order[] = [];
  cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  conversations: ChatConversation[] = [];

  registerVendor(vendor: Omit<Vendor, 'id'>): boolean {
    const newVendor: Vendor = {
      ...vendor,
      id: (this.vendors.length + 1).toString()
    };
    this.vendors.push(newVendor);
    return true;
  }

  registerCustomer(customer: Omit<Customer, 'id'>): boolean {
    const newCustomer: Customer = {
      ...customer,
      id: (this.customers.length + 1).toString()
    };
    this.customers.push(newCustomer);
    return true;
  }

  loginVendor(email: string, password: string): Vendor | null {
    const vendor = this.vendors.find(v => v.email === email && v.password === password);
    if (vendor) {
      this.currentUser.next({ ...vendor, type: 'vendor' });
      return vendor;
    }
    return null;
  }

  loginCustomer(emailOrPhone: string, password: string): Customer | null {
    const customer = this.customers.find(c =>
      (c.email === emailOrPhone || c.phone === emailOrPhone) && c.password === password
    );
    if (customer) {
      this.currentUser.next({ ...customer, type: 'customer' });
      return customer;
    }
    return null;
  }

  addProduct(product: Omit<Product, 'id'>): boolean {
    const newProduct: Product = {
      ...product,
      id: (this.products.length + 1).toString(),
      status: 'active'
    };
    this.products.push(newProduct);
    return true;
  }

  updateProductStatus(productId: string, status: 'active' | 'inactive'): boolean {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.status = status;
      return true;
    }
    return false;
  }

  getActiveProducts(): Product[] {
    return this.products.filter(p => p.status === 'active');
  }

  getProductsByVendor(vendorId: string): Product[] {
    return this.products.filter(p => p.vendorId === vendorId);
  }

  getOrdersByVendor(vendorId: string): Order[] {
    return this.orders.filter(o => o.vendorId === vendorId);
  }

  placeOrder(order: Omit<Order, 'id' | 'orderDate'>): boolean {
    // Check stock availability
    const product = this.products.find(p => p.id === order.productId);
    if (!product) {
      return false;
    }
    
    if (product.quantity < order.quantity) {
      return false;
    }
    
    // Reduce stock
    product.quantity -= order.quantity;
    
    const newOrder: Order = {
      ...order,
      id: (this.orders.length + 1).toString(),
      orderDate: new Date()
    };
    this.orders.push(newOrder);
    return true;
  }

  updateOrderStatus(orderId: string, status: 'placed' | 'packed' | 'delivered' | 'cancelled'): boolean {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      // If order is being cancelled, restore stock
      if (status === 'cancelled' && order.status !== 'cancelled') {
        const product = this.products.find(p => p.id === order.productId);
        if (product) {
          product.quantity += order.quantity;
        }
      }
      order.status = status;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.next(null);
  }

  getCurrentUser(): any {
    return this.currentUser.value;
  }

  addToCart(productId: string, quantity: number = 1): boolean {
    const product = this.products.find(p => p.id === productId);
    if (!product) return false;

    const existingItem = this.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem: CartItem = {
        id: (this.cart.length + 1).toString(),
        productId,
        quantity,
        product
      };
      this.cart.push(cartItem);
    }
    this.cartSubject.next([...this.cart]);
    return true;
  }

  removeFromCart(cartItemId: string): boolean {
    const index = this.cart.findIndex(item => item.id === cartItemId);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]);
      return true;
    }
    return false;
  }

  updateCartQuantity(cartItemId: string, quantity: number): boolean {
    const item = this.cart.find(item => item.id === cartItemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
      return true;
    }
    return false;
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([]);
  }

  updateCustomerProfile(customerId: string, profileData: any): boolean {
    const customer = this.customers.find(c => c.id === customerId);
    if (customer) {
      Object.assign(customer, profileData);
      this.currentUser.next(customer);
      return true;
    }
    return false;
  }

  changeCustomerPassword(customerId: string, currentPassword: string, newPassword: string): boolean {
    const customer = this.customers.find(c => c.id === customerId);
    if (customer && customer.password === currentPassword) {
      customer.password = newPassword;
      return true;
    }
    return false;
  }

  getCustomerOrders(customerId: string): Order[] {
    return this.orders.filter(order => order.customerId === customerId);
  }

  updateVendorProfile(vendorId: string, profileData: any): boolean {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      Object.assign(vendor, profileData);
      this.currentUser.next(vendor);
      return true;
    }
    return false;
  }

  changeVendorPassword(vendorId: string, currentPassword: string, newPassword: string): boolean {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor && vendor.password === currentPassword) {
      vendor.password = newPassword;
      return true;
    }
    return false;
  }

  getOrCreateConversation(customerId: string, vendorId: string): ChatConversation {
    let conversation = this.conversations.find(c => c.customerId === customerId && c.vendorId === vendorId);

    if (!conversation) {
      const customer = this.customers.find(c => c.id === customerId);
      const vendor = this.vendors.find(v => v.id === vendorId);

      conversation = {
        id: (this.conversations.length + 1).toString(),
        customerId,
        vendorId,
        customerName: customer?.name || 'Customer',
        vendorName: vendor?.name || 'Vendor',
        lastMessage: '',
        lastMessageTime: new Date(),
        messages: []
      };

      this.conversations.push(conversation);
    }

    return conversation;
  }

  sendMessage(conversationId: string, senderId: string, message: string, senderType: 'customer' | 'vendor'): boolean {
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (conversation) {
      const senderName = senderType === 'customer'
        ? conversation.customerName
        : conversation.vendorName;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId,
        receiverId: senderType === 'customer' ? conversation.vendorId : conversation.customerId,
        message,
        timestamp: new Date(),
        senderType,
        senderName
      };

      conversation.messages.push(newMessage);
      conversation.lastMessage = message;
      conversation.lastMessageTime = new Date();

      return true;
    }
    return false;
  }

  getConversationsForUser(userId: string, userType: 'customer' | 'vendor'): ChatConversation[] {
    return this.conversations.filter(c =>
      userType === 'customer' ? c.customerId === userId : c.vendorId === userId
    );
  }

  updateProductStock(productId: string, newStock: number): boolean {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.quantity = newStock;
      return true;
    }
    return false;
  }
}