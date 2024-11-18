import CategoryFilter from "../components/filter/CategoryFilter";
import SortingFilter from "../components/filter/SortingFilter";
import ProductList from "../components/product/ProductList";
import { useProducts } from "../hooks/useProducts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
  const { products, categories, loading, error, filters, updateFilters } =
    useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-6">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={150} />
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
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default Home;
