import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const ProductList = ({ products }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default ProductList;
