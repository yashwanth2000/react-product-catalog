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
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const foundProduct = products.find((p) => p.id === Number(id));
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        setProduct(foundProduct);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton height={400} />
          <div>
            <Skeleton height={40} className="mb-4" />
            <Skeleton height={30} width={150} className="mb-4" />
            <Skeleton count={4} className="mb-2" />
            <Skeleton height={50} className="mt-4" />
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
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
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-600">By {product.brand}</p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span
                  className={`${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.availabilityStatus}
                </span>
              </div>

              <p className="text-gray-600 mb-8">{product.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>{product.warrantyInformation}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                  <span>{product.returnPolicy}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {isAvailable && (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
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
