import React, { useState } from "react";
const API = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ item }) => {
    const [formData, setFormData] = useState({ name: item.name || "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        
        try {
            const response = await fetch(`${API}/1`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update item");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h3>Update Item</h3>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            {success && <p style={{ color: "green" }}>Item updated successfully</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;