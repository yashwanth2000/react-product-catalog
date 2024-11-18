import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import ShopEaseImg from "../assets/shopease.jpg";

function Header() {    
  return (
    <header className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={ShopEaseImg}
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-2xl font-semibold text-gray-800">ShopEase</h1>
        </Link>

        <div className="relative flex-grow mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-80 py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <button className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition">
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline">Cart</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
