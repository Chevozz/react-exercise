import { useState } from "react";
import { Routes, Route } from "react-router-dom";

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
          <Route index element={<AdminDashboard />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CatalogProvider>
  );
}