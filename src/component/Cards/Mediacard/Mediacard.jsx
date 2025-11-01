import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slices/cartlistslices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function Mediacard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price) || 0,
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

  const price = parseFloat(product.price) || 0;
  const originalPrice = product.discount
    ? price /
      (1 -
        parseFloat(product.discount.replace("-", "").replace("%", "")) / 100)
    : price;

  return (
    <Link to={`/product/${product.id}`} className="text-inherit no-underline">
      <div
        className="bg-black text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 
                   transition-transform duration-200 cursor-pointer flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-800 pt-[60%]">
          <img
            src={product.imageURL}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {product.discount && (
            <div className="absolute top-3 right-3 bg-[#FFD24A] text-black px-2 py-1 rounded-md text-xs font-bold">
              {product.discount}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Title */}
          <div className="font-bold text-base leading-tight text-white">
            {product.title}
          </div>

          {/* Subtitle and Rating */}
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>{product.subtitle}</span>
            {product.rating && (
              <>
                <span>•</span>
                <span className="text-[#FFD24A]">★ {product.rating}</span>
              </>
            )}
          </div>

          {/* Sold Info */}
          {product.sold && (
            <div className="text-xs text-gray-500">{product.sold} sold</div>
          )}

          {/* Price + Add to Cart */}
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-[#FFD24A]">
                ${price.toFixed(2)}
              </div>
              {product.discount && (
                <div className="text-xs text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-[#FFD24A] text-black rounded-lg font-semibold text-sm 
                         hover:bg-[#e6be44] transition-colors whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
