import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  if (activePage === 'admin') {
    return (
      <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <AdminPage />
        <ToastContainer />
        <AuthModal />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'orders':
        return <OrdersPage />;
      case 'about':
        return <AboutContactPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/60 text-zinc-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Quick View Modal */}
      <QuickViewModal />

      {/* Authentication Modal */}
      <AuthModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

