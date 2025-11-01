import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItem,
  removeItem,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartlistslices";

export default function Cartlist() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cartList
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const increase = (item) => {
    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        price: parseFloat(item.price) || 0,
        image: item.image,
      })
    );
  };

  const decrease = (id) => dispatch(decreaseQuantity(id));
  const remove = (id) => dispatch(removeItem(id));

  const setQuantity = (id, value) => {
    const quantity = parseInt(value);
    if (quantity > 0 && !isNaN(quantity)) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-200px)] bg-[#111217] text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#FFD24A]">Shopping Cart</h2>
          <p className="mt-2 text-gray-400">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Clear all items from cart?")) {
                dispatch(clearCart());
              }
            }}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-[#FFD24A] hover:text-[#FFD24A] transition-colors duration-200"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Search Bar */}
      {items.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search items in cart..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-[#1A1B1F] border border-gray-700 rounded-lg text-base text-white placeholder-gray-400 focus:border-[#FFD24A] outline-none transition-all"
          />
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500">
              Found {filteredItems.length} of {items.length} items
            </p>
          )}
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center p-20 bg-[#1A1B1F] rounded-xl shadow-inner border border-gray-800">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold mb-2 text-[#FFD24A]">
            Your cart is empty
          </h3>
          <p className="text-gray-400 mb-6">Add some items to get started!</p>
          <Link to="/products">
            <button className="px-6 py-3 bg-[#FFD24A] text-black rounded-lg font-semibold text-base hover:bg-yellow-400 transition">
              Browse Games
            </button>
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center p-16 bg-[#1A1B1F] rounded-xl shadow-inner border border-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-[#FFD24A]">
            No items found
          </h3>
          <p className="text-gray-400">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1B1F] rounded-xl p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center border border-gray-800 hover:border-[#FFD24A]/50 transition"
            >
              {/* Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}

              {/* Details */}
              <div>
                <div className="font-semibold text-base mb-1 text-white">
                  {item.title}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  ${parseFloat(item.price || 0).toFixed(2)} each
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(item.id)}
                    className="w-8 h-8 border border-gray-600 rounded-md text-lg flex items-center justify-center hover:border-[#FFD24A] hover:text-[#FFD24A]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => setQuantity(item.id, e.target.value)}
                    className="w-16 text-center border border-gray-600 bg-transparent rounded-md text-sm p-1 text-white"
                  />
                  <button
                    onClick={() => increase(item)}
                    className="w-8 h-8 border border-gray-600 rounded-md text-lg flex items-center justify-center hover:border-[#FFD24A] hover:text-[#FFD24A]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="ml-2 px-3 py-1 text-[#FFD24A] font-semibold text-sm hover:text-yellow-300"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <div className="font-bold text-lg text-[#FFD24A]">
                  ${parseFloat(item.totalPrice || 0).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="bg-[#1A1B1F] rounded-xl p-6 mt-2 border border-gray-800">
            <div className="flex justify-between mb-4 text-base text-gray-300">
              <span>
                Subtotal ({totalQuantity}{" "}
                {totalQuantity === 1 ? "item" : "items"}):
              </span>
              <span className="font-semibold text-[#FFD24A]">
                ${parseFloat(totalAmount || 0).toFixed(2)}
              </span>
            </div>
            <Link to="/checkout">
              <button className="w-full py-3 bg-[#FFD24A] text-black rounded-lg font-bold text-base hover:bg-yellow-400 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
