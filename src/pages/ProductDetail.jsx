import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  ChevronLeft,
  ShoppingCart,
  Star,
  Shield,
  RefreshCw,
} from "lucide-react";
import { fetchProducts } from "../utils/api";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const foundProduct = products.find((p) => p.id === Number(id));
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        setProduct(foundProduct);

        const isProductInCart = state.items.some(
          (item) => item.id === foundProduct.id
        );
        setIsAddedToCart(isProductInCart);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, state.items]);

  const addToCart = () => {
    if (!isAddedToCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success("Added to cart!");
      setIsAddedToCart(true);
    } else {
      dispatch({ type: "TOGGLE_CART" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center text-gray-300 mb-8">
            <Skeleton circle width={24} height={24} className="mr-2" />
            <Skeleton width={150} height={20} />
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
              <div>
                <Skeleton className="aspect-square rounded-lg shadow-md mb-6" />

                <div className="flex gap-4 overflow-x-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="aspect-square w-20 rounded-lg border-2"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <Skeleton width={300} height={32} className="mb-3" />
                  <Skeleton width={200} height={24} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Skeleton circle width={40} height={40} />
                  <Skeleton width={80} height={20} />
                  <Skeleton width={30} height={20} />
                  <Skeleton width={100} height={20} />
                </div>

                <Skeleton count={4} height={20} className="mb-2" />

                <div className="space-y-6 my-8">
                  <div className="flex items-center gap-3">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={200} height={20} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={200} height={20} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Skeleton width={100} height={32} />
                  <Skeleton width={150} height={48} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">
          {error === "Product not found"
            ? "The requested product could not be found."
            : "Something went wrong. Please try again later."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!product) return null;
  const isAvailable = product?.availabilityStatus !== "Out of Stock";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md mb-6">
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

            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
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
                    onClick={() => addToCart(product)}
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
    </div>
  );
};

export default ProductDetailsPage;
