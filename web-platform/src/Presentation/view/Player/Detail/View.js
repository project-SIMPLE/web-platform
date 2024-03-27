import React from "react";
import DI from "../../../../DI/ioc";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
    let navigate = useNavigate();
    let { id } = useParams();
    const { name, price, getProduct, onChange, updateProduct, deleteProduct } = DI.resolve("ProductDetailViewModel");

    React.useEffect(() => {
        getProduct(id);
    }, [getProduct, id]);

    return (
        <div className="page">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <h2>Edit Product</h2>
                <Button title={"Update"} onClick={() => {
                    updateProduct(id);
                    navigate(-1);
                }} />
                <Button title={"Delete"} onClick={() => {
                    deleteProduct(id);
                    navigate(-1);
                }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <TextInput placeholder="Product Name" autoFocus={true} value={name} onChange={e => onChange(e.target.value, "name")} />
                <TextInput placeholder="Product Price" type="number" value={price} onChange={e => onChange(e.target.value, "price")} />
            </div>
        </div>
    );
}