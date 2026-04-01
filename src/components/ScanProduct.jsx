import React, { useState } from "react";
import axios from "axios";

function ScanProduct() {
  const unitOptions = ["pcs", "L", "ml", "kg", "g", "pack", "bottle"];

  const [file, setFile] = useState(null);
  const [unit, setUnit] = useState("pcs");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image first.");
      return;
    }
    if (!quantity || Number(quantity) < 1) {
      setMessage("Please enter a valid quantity (minimum 1).");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", "demo-user");
      formData.append("unit", unit);
      formData.append("quantity", String(quantity));

      console.log("Uploading image to backend...");
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload success. Response:", response.data);
      const detected = response.data?.items || response.data?.detectedItems || [];
      setItems(Array.isArray(detected) ? detected : []);
      setMessage("Image uploaded and processed successfully.");
    } catch (error) {
      console.error("Upload failed:", error);
      const apiMessage = error.response?.data?.message;
      setMessage(apiMessage || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ margin: "40px" }}>
      <h2>Scan Product</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div style={{ marginTop: "12px" }}>
        <label htmlFor="unit-select" style={{ marginRight: "8px" }}>
          Unit:
        </label>
        <select
          id="unit-select"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {unitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "12px" }}>
        <label htmlFor="qty-input" style={{ marginRight: "8px" }}>
          Quantity:
        </label>
        <input
          id="qty-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: "90px" }}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {message && <p style={{ marginTop: "12px" }}>{message}</p>}

      {items.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <h3>Detected Items</h3>
          <ul>
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {message && items.length === 0 && !loading && (
        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          No detected items returned from API.
        </p>
      )}
    </div>
  );
}

export default ScanProduct;