import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111217] text-white py-5 mt-auto border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
        {/* Logo/Brand */}
        <div>
          <span className="font-bold text-[#FFD24A] text-lg">LootBar</span>
          <p className="mt-2 text-sm text-gray-400">
            © {new Date().getFullYear()} LootBar — Simple ecommerce demo. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center text-sm">
          <Link
            to="/"
            className="text-white hover:text-[#FFD24A] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-[#FFD24A] transition-colors duration-200"
          >
            Shop
          </Link>
          {/* <Link
            to="/contact"
            className="text-white hover:text-[#FFD24A] transition-colors duration-200"
          >
            Contact
          </Link> */}
        </nav>
      </div>
    </footer>
  );
}
