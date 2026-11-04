import { createContext, useCallback, useContext, useState } from "react";

const CatalogContext = createContext(null);

// Katalog dimuat sekali di sini lalu dibagikan ke seluruh halaman.
// refresh() dipakai ulang oleh dashboard, sehingga hanya satu tempat yang menyentuh API.
export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState({
    products: [],
    categories: [],
    isLoading: true,
    isStale: false,
    error: null,
  });

  // useCallback wajib: identitas fungsi harus stabil, kalau tidak useEffect
  // di Dashboard akan memicu muat ulang katalog tanpa henti.
  const refresh = useCallback(async (loader) => {
    setCatalog((current) => ({ ...current, isLoading: true }));
    const result = await loader();
    setCatalog({
      products: result.products,
      categories: [
        "Semua",
        ...Array.from(new Set(result.products.map((item) => item.category))),
      ],
      isLoading: false,
      isStale: result.stale,
      error: result.error,
    });
  }, []);

  return (
    <CatalogContext.Provider value={{ ...catalog, refresh }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog harus dipakai di dalam CatalogProvider");
  }

  return context;
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }

  return context;
}
