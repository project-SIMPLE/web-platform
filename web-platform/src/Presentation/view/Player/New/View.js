import React from "react";
import { useNavigate } from "react-router-dom";
import DI from "../../../../DI/ioc";
import Button from "../../../../Presentation/components/Button";
import TextInput from "../../../../Presentation/components/TextInput";

export default function ProductNew() {
    let navigate = useNavigate();
    const { name, price, onChange, saveProduct } = DI.resolve("ProductNewViewModel");
    
    return (
        <div className="page">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <h2>New Product</h2>
                <Button title={"Save"} onClick={() => {
                    saveProduct();
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