import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerts from "../components/Alerts";
import DishSuggestions from "../components/DishSuggestions";
import Fridge3D from "../components/Fridge3D";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const formatItemName = (name = "") => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/inventory");
      setItems(response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch inventory:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleQuantityChange = async (item, delta) => {
    try {
      setActionLoading(true);
      await axios.patch("http://localhost:5000/api/inventory", {
        userId: item.userId || "demo-user",
        itemName: item.name,
        delta,
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to update quantity:", error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      setActionLoading(true);
      await axios.delete("http://localhost:5000/api/inventory", {
        data: {
          userId: item.userId || "demo-user",
          itemName: item.name,
        },
      });
      await fetchInventory();
    } catch (error) {
      console.error("Failed to delete item:", error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="dashboard">

     <div className="hero">

     {/* 3D background */}
    <div className="hero-3d">
      <Fridge3D />
    </div>

     {/* Text */}
    <div className="hero-text">
    <h1>AI Refrigerator</h1>
    <p>The future of smart kitchens</p>
    </div>

   </div>

      <div className="top-section">
        <Alerts />
      </div>

      <div className="card">
        <h2>Inventory</h2>
        {loading && <p>Loading inventory...</p>}
        {!loading && items.length === 0 && <p>No items found. Scan a product to add items.</p>}
        {!loading && items.length > 0 && (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td>{formatItemName(item.name)}</td>
                  <td>{item.quantity} {item.unit || "pcs"}</td>
                  <td>
                    <button
                      className="inventory-action-btn"
                      onClick={() => handleQuantityChange(item, 1)}
                      disabled={actionLoading}
                    >
                      +
                    </button>
                    <button
                      className="inventory-action-btn"
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={actionLoading}
                    >
                      -
                    </button>
                    <button
                      className="inventory-delete-btn"
                      onClick={() => handleDelete(item)}
                      disabled={actionLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 3D Fridge */}
    

      <DishSuggestions />

    </div>
  );
}

export default Dashboard;