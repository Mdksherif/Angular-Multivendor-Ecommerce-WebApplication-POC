export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
  status: 'active' | 'inactive';
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  senderType: 'customer' | 'vendor';
  senderName: string;
}

export interface ChatConversation {
  id: string;
  customerId: string;
  vendorId: string;
  customerName: string;
  vendorName: string;
  lastMessage: string;
  lastMessageTime: Date;
  messages: ChatMessage[];
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: 'placed' | 'packed' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'upi';
  orderDate: Date;
  customerDetails: Customer;
  productDetails: Product;
}