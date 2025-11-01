import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#111217] px-6">
      <div className="text-center bg-[#1A1B1F] border border-gray-700 rounded-2xl shadow-lg max-w-lg w-full p-10">
        <h1 className="text-[5rem] font-extrabold text-[#FFD24A] m-0">404</h1>
        <p className="text-xl text-white mt-2 font-semibold">Page not found</p>
        <p className="text-gray-400 mt-3">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-gray-500 rounded-lg text-white bg-transparent hover:bg-gray-800 transition-all duration-300"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-[#FFD24A] text-black font-semibold hover:bg-yellow-400 transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
