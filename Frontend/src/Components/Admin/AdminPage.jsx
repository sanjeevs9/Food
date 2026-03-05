import { useEffect, useState } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/shopname`)
      .then((res) => setRestaurants(res.data))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, shopName) => {
    if (!window.confirm(`Delete restaurant "${shopName}"? This removes the seller, their menu, and balance.`)) return;
    setDeleting(id);
    try {
      await axios.post(`${NETWORK}/food/seller/delete/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      alert(msg || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading restaurants...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Restaurants (Admin)</h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
        </div>
        {restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants found.</p>
        ) : (
          <ul className="space-y-3">
            {restaurants.map((r) => (
              <li
                key={r._id}
                className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">{r.shopName}</p>
                  <p className="text-sm text-gray-500">{r.phoneNumber}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(r._id, r.shopName)}
                  disabled={!!deleting}
                  className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting === r._id ? "Deleting…" : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
