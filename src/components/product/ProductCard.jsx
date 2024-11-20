import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Added to cart!", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#10B981",
        color: "#fff",
      },
    });
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWished((prev) => !prev);
    toast.success(isWished ? "Removed from wishlist" : "Added to wishlist", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: isWished ? "#FF4444" : "#10B981",
        color: "#fff",
      },
    });
  };

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
        <div className="relative group h-72">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-t-xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <ul className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
            <li>
              <button
                onClick={addToCart}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:text-red-500 hover:shadow-lg transition-shadow duration-300"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                onClick={toggleWishlist}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:text-red-500 hover:shadow-lg transition-shadow duration-300"
              >
                <Heart className="w-6 h-6" color={isWished ? "red" : "gray"} />
              </button>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xl font-bold text-red-500">
                  {`₹ ${product.price}`}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
