import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartlistslices";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalAmount, totalQuantity } = useSelector((state) => state.cartList);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all fields before proceeding!");
        return;
      }
    }

    // Simulate order completion
    dispatch(clearCart());
    toast.success("🎉 Purchase successful! Thank you for your order.");
    navigate("/products");
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#111217] flex items-center justify-center text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1B1F] p-6 rounded-xl border border-gray-800 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-[#FFD24A] mb-6 text-center">
          Checkout
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">City</label>
          <input
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Postal Code</label>
          <input
            type="text"
            placeholder="Enter postal code"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Country</label>
          <input
            type="text"
            placeholder="Enter your country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 bg-[#111217] border border-gray-700 rounded-lg text-white focus:border-[#FFD24A] outline-none"
          />
        </div>

        {/* Total Summary */}
        <div className="flex justify-between mb-6 text-gray-300">
          <span>
            Total ({totalQuantity} {totalQuantity === 1 ? "item" : "items"}):
          </span>
          <span className="font-semibold text-[#FFD24A]">
            ${parseFloat(totalAmount || 0).toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full py-3 bg-[#FFD24A] text-black rounded-lg font-bold hover:bg-yellow-400 transition"
        >
          Complete Purchase
        </button>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="w-full mt-3 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-[#FFD24A] hover:text-[#FFD24A] transition"
        >
          Back to Cart
        </button>
      </form>
    </div>
  );
}
