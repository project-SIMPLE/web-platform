import { useState } from "react";

export default function ProductNewViewModel(CreateProductUseCase) { // 1

    const [error, setError] = useState("");
    const [values, setValues] = useState({
        name: ``,
        price: 0
    });

    async function saveProduct() { // 2
        const { /*result,*/ error } = await CreateProductUseCase.execute(values);
        setError(error);
    }

    function onChange(value, prop) { // 3
        // if (field === "name") {
        //     setName(value);
        // } else if (field === "price") {
        //     setPrice(value);
        // }
        setValues({ ...values, [prop]: value });
    }

    return { // 4
        ...values,
        error,
        onChange,
        saveProduct
    };
}