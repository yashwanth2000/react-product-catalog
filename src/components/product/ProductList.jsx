import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const ProductList = ({ products }) => {

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProductList;
