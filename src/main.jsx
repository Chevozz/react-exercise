import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "./utils/ProductContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ProductProvider>
                <CartProvider>
                    <App />
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </CartProvider>
            </ProductProvider>
        </QueryClientProvider>
    </BrowserRouter>
</React.StrictMode>
);