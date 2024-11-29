import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <CartDrawer />
        <Toaster position="bottom-right" />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
