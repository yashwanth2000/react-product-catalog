const BASE_URL = "https://run.mocky.io/v3/d37d5971-afc3-4871-a3a3-2935f8a459b1";

export const fetchProducts = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response) throw new Error("Failed to fetch Products");

    const data = await response.json();
    console.log(data);

    return data.products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

