import { ShoppingCart, Heart, Star } from "lucide-react";
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
    <div className="h-full w-full">
      <div className="h-full flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative w-full pt-[75%]">
          <div className="absolute inset-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover rounded-t-xl"
            />
            {/* Overlay effect on image*/}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

            <div className="absolute bottom-4 left-4 space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={addToCart}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={toggleWishlist}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-red-50 transition-colors duration-300"
              >
                <Heart
                  className="w-5 h-5"
                  color={isWished ? "red" : "black"}
                  fill={isWished ? "red" : "none"}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <div className="text-xl font-bold text-red-500">
              ₹ {product.price}
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
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
    rating: PropTypes.number.isRequired,
    brand: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
