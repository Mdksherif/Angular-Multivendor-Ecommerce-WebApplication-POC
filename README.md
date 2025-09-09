# Ecommerce Multivendor Store

A proof of concept (POC) for a multivendor ecommerce platform built with Angular. This demonstrates the core functionality of enabling multiple vendors to sell products through a unified marketplace, featuring separate interfaces for customers and vendors with mobile app support using Capacitor.

## Features

- **Customer Features**
  - User registration and login
  - Product browsing and search
  - Shopping cart functionality
  - User dashboard and profile management

- **Vendor Features**
  - Vendor registration and login
  - Vendor dashboard
  - Product management

- **Additional Features**
  - Real-time chat system
  - Mobile app support (Android)
  - Responsive design

## Tech Stack

- **Frontend**: Angular
- **Mobile**: Capacitor
- **Styling**: SCSS
- **Platform**: Android support included

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── customer-home/
│   │   ├── customer-login/
│   │   ├── customer-register/
│   │   ├── customer-dashboard/
│   │   ├── customer-profile/
│   │   ├── vendor-login/
│   │   ├── vendor-register/
│   │   ├── vendor-dashboard/
│   │   ├── products/
│   │   ├── product-view/
│   │   ├── cart/
│   │   └── chat/
│   ├── services/
│   └── models/
└── android/
```

## Getting Started

### Prerequisites

- Node.js
- Angular CLI
- Android Studio (for mobile development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend-backup
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
ng serve
```

4. For Android development
```bash
npx cap sync android
npx cap open android
```

## Development

- **Web**: `ng serve` - runs on http://localhost:4200
- **Android**: Use Android Studio after running `npx cap open android`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request