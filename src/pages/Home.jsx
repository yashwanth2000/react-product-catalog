import { useState } from "react";
import FilterPanel from "../components/filter/FilterPanel";
import Header from "../components/Header";
import ProductList from "../components/product/ProductList";
import { useProducts } from "../hooks/useProducts";
import Skeleton from "react-loading-skeleton";
import { FilterIcon, X } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
  const { products, categories, loading, error, filters, updateFilters } =
    useProducts();
  const [showFilters, setShowFilters] = useState(false);

  if (!loading && products.length === 0) {
    return (
      <>
        <Header updateFilters={updateFilters} />
        <div className="container mx-auto px-4 mt-8">
          <div className="text-center py-10">
            <p className="text-gray-500">
              No products found matching your search.
            </p>
          </div>
        </div>
      </>
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
    <>
      <Header updateFilters={updateFilters} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar for Desktop */}
          <div className="hidden md:block md:w-64">
            <FilterPanel
              categories={categories}
              selectedCategories={filters.categories}
              onCategoryChange={(categories) => updateFilters({ categories })}
              sortValue={filters.sortBy}
              onSortChange={(sortBy) => updateFilters({ sortBy })}
            />
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowFilters(true)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md flex items-center space-x-2"
            >
              <FilterIcon className="h-6 w-6" />
              <span>Filters</span>
            </button>
            <div
              className={`fixed inset-0 bg-white z-50 transform ${
                showFilters ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300`}
            >
              <div className="relative">
                <button
                  onClick={() => setShowFilters(false)}
                  className="absolute top-4 right-4 p-2 text-gray-700 hover:text-red-500 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
                <FilterPanel
                  categories={categories}
                  selectedCategories={filters.categories}
                  onCategoryChange={(categories) =>
                    updateFilters({ categories })
                  }
                  sortValue={filters.sortBy}
                  onSortChange={(sortBy) => updateFilters({ sortBy })}
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full flex-1">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
