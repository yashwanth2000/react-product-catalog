import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Shield,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ProductDetailsModal = ({ product, onClose }) => {
  const { state, dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(
    state.items.some((item) => item.id === product.id)
  );

  const addToCart = () => {
    if (!isAddedToCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success("Added to cart!");
      setIsAddedToCart(true);
    } else {
      dispatch({ type: "TOGGLE_CART" });
    }
  };

  const isAvailable = product?.availabilityStatus !== "Out of Stock";

  const navigateImage = (direction) => {
    const totalImages = product.images.length;
    setSelectedImage((prev) =>
      direction === "next"
        ? (prev + 1) % totalImages
        : (prev - 1 + totalImages) % totalImages
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-md mb-6 relative">
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    } hover:shadow-lg`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
                {product.title}
              </h1>
              <p className="text-lg text-gray-500">By {product.brand}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
                <span className="ml-2 text-gray-600 text-lg">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span
                className={`text-lg ${
                  isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.availabilityStatus}
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3 text-gray-600 text-lg">
                <Shield className="w-6 h-6" />
                <span>{product.warrantyInformation}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-lg">
                <RefreshCw className="w-6 h-6" />
                <span>{product.returnPolicy}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-900">
                ₹ {product.price.toFixed(2)}
              </span>
              {isAvailable && (
                <button
                  onClick={addToCart}
                  className={`flex items-center gap-3 px-8 py-3 rounded-xl shadow-md transition ${
                    isAddedToCart
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailsModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    brand: PropTypes.string,
    images: PropTypes.array,
    description: PropTypes.string,
    availabilityStatus: PropTypes.string,
    warrantyInformation: PropTypes.string,
    returnPolicy: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailsModal;
