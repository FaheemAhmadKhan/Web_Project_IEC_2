import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartlistslices";
import { toast } from "react-toastify";


// Mock Data
import products from "../games.json";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === Number(id));

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id ?? Date.now().toString(),
        title: product.title ?? product.name,
        price: product.price ?? 0,
        image: product.imageURL,
      })
    );

    // Toast Notification
    toast.success(`${product.title} added to cart!`, {
      style: {
        background: "#1e1e1e",
        color: "#FFD24A",
      },
      iconTheme: {
        primary: "#FFD24A",
        secondary: "#1e1e1e",
      },
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-300 bg-black">
        <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-black bg-[#FFD24A] rounded-lg hover:bg-[#e6be44] transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-[#121212] rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Product Image */}
        <div className="relative overflow-hidden max-h-96 rounded-2xl group">
          <img
            src={product.imageURL}
            alt={product.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.discount && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#FFD24A] mb-2">
            {product.title}
          </h1>
          <p className="text-sm text-gray-400 mb-4">{product.subtitle}</p>

          {/* Rating + Sold */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.29a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.29c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.29a1 1 0 00-.364-1.118L2.98 8.717c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.29z" />
            </svg>
            <span className="font-semibold text-yellow-500">
              {product.rating}
            </span>
            <span className="text-gray-500">•</span>
            <span>{product.sold} sold</span>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#FFD24A]">
              $
              {(
                product.price /
                (1 - parseInt(product.discount || "0") / 100)
              ).toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-[#FFD24A] text-black rounded-lg font-medium hover:bg-[#e6be44] transition-colors">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
