import CategoryFilter from "../components/filter/CategoryFilter";
import SortingFilter from "../components/filter/SortingFilter";
import ProductList from "../components/product/ProductList";
import { useProducts } from "../hooks/useProducts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
  const { products, categories, loading, error, filters, updateFilters } =
    useProducts();

  // console.log("Home component rendered with products:", products);

  if (!loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center py-10">
          <p className="text-gray-500">
            No products found matching your search.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Skeleton width={200} height={24} className="mb-6" />
              <div className="space-y-4">
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Skeleton width={100} height={24} className="mb-6" />
              <div className="relative">
                <Skeleton width="100%" height={48} />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Skeleton circle width={16} height={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4">
                <Skeleton height={200} className="mb-4" />
                <Skeleton count={2} className="mb-2" />
                <Skeleton width={80} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategories={filters.categories}
            onChange={(categories) => updateFilters({ categories })}
          />
          <SortingFilter
            value={filters.sortBy}
            onChange={(sortBy) => updateFilters({ sortBy })}
          />
        </div>

        {/* Products */}
        <div className="w-full flex-1">
          {products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
