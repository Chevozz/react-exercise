import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import LoginPage from "./pages/LoginPage";

import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import NotFound from "./pages/frontpages/NotFound";

import { CatalogProvider } from "./context/CartContext";
import { getToken } from "./api";

import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // Token dipakai sebagai penentu tampilan awal; login/logout memperbaruinya.
  const [hasToken, setHasToken] = useState(() => Boolean(getToken()));

  if (!hasToken) {
    return <LoginPage onSuccess={() => setHasToken(true)} />;
  }

  return (
    <CatalogProvider>
      <Routes>
        <Route
          element={
            <MainLayout
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onLogout={() => setHasToken(false)}
            />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
            {/* Halaman default admin */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="add-product" element={<ProductForm />} />
          <Route path="edit-product/:id" element={<ProductEdit />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CatalogProvider>
  );
}