import React from "react";

export default function ProductDetailViewModel(GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase) {

    // const [name, setName] = React.useState("");
    // const [price, setPrice] = React.useState(0);
    const [error, setError] = React.useState("");
    const [values, setValues] = React.useState({
        name: "",
        price: 0
    });

    async function getProduct(id) {
        // Fetch the product from the server
        const { result, error } = await GetProductUseCase.execute(id);
        setError((error && error.message) || "");
        setValues({ ...result });
    }

    function onChange(value, prop) {
        // if (field === "name") {
        //     setName(value);
        // } else if (field === "price") {
        //     setPrice(value);
        // }
        setValues({
            ...values,
            [prop]: value
        });
    }

    async function updateProduct(id) {
        // Update the product on the server
        const { result, error } = await UpdateProductUseCase.execute(id, values);
        setError((error && error.message) || "");
    }

    async function deleteProduct(id) {
        // Delete the product from the server
        const { result, error } = await DeleteProductUseCase.execute(id);
        setError((error && error.message) || ""); 
    }

    return {
        // name,
        // price,
        error,
        getProduct,
        onChange,
        updateProduct,
        deleteProduct,
        ...values,
    };
}