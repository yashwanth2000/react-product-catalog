import { useNavigate } from "react-router-dom";
function ProductDetails() {
  const navigate = useNavigate();

  return (
    <div>
      ProductDetails
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default ProductDetails;
