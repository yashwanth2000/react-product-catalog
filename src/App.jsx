import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <CartDrawer />
        <Toaster position="bottom-right" />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
