import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import ShopEaseImg from "../assets/shopease.jpg";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";

function Header({ updateFilters }) {
  const { state, dispatch } = useCart();

  const handleCartClick = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const handleSearchChange = (event) => {
    updateFilters({ search: event.target.value });
  };

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md py-4 mb-8 sticky top-0 z-50">
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
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <button
          onClick={handleCartClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  updateFilters: PropTypes.func.isRequired,
};

export default Header;
