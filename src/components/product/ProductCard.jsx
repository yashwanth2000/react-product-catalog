import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const isProductInCart = state.items.some((item) => item.id === product.id);
    setIsAddedToCart(isProductInCart);
  }, [state, product.id]);

  const addToCart = (e) => {
    if (!isAddedToCart) {
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
      setIsAddedToCart(true);
    } else {
      dispatch({ type: "TOGGLE_CART" });
    }
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

          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-black text-lg font-semibold hover:text-blue-600 hover:underline hover:underline-offset-4 transition-colors duration-300"
            >
              View Details
            </button>

            <button
              onClick={addToCart}
              className={`${
                isAddedToCart
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                  : "bg-green-600 text-white hover:bg-green-700 hover:scale-105 py-2 px-4"
              } py-2 px-4 flex items-center justify-center space-x-2 rounded-md transition-all duration-300 ease-in-out shadow-md hover:shadow-lg`}
            >
              <span>{isAddedToCart ? "Added to Cart" : "Add to Cart"}</span>
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
