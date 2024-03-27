import { useState } from "react";

export default function ProductListViewModel(GetProductsUseCase) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

  /*const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    setProducts(data);
  };*/
    async function getProducts() {
        const { result, error } = await GetProductsUseCase.execute();
        setError(error);
        setProducts(result);
    }

    return { 
        error,
        products,
        getProducts,
    };
}