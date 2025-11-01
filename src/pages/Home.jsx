import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../games.json";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      //4 desired games
      const selectedTitles = [
        "League of Legends: Wild Rift",
        "Valorant Points",
        "Steam Wallet Code",
        "Dragon Ball Legends",
      ];

      const filtered = productsData.filter((product) =>
        selectedTitles.includes(product.title)
      );

      setFeaturedProducts(filtered);
    }
  }, []);

  const formatPrice = (price) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#FFD24A]">
            Welcome to LootBar.gg
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Your Ultimate Gaming Digital Store
          </p>
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Get instant access to game currencies, gift cards, and the latest titles.
            Level up your gaming experience with instant digital delivery.
          </p>
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-[#FFD24A] text-black rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-5 bg-[#1A1B1F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Why Choose LootBar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: "⚡", title: "Instant Delivery", text: "Get your game codes instantly." },
              { emoji: "💰", title: "Best Prices", text: "Competitive deals on all games." },
              { emoji: "🎮", title: "Wide Selection", text: "All your favorite games in one place." },
              { emoji: "🛡️", title: "Secure Shopping", text: "Trusted digital code delivery." },
            ].map((item, i) => (
              <div
                key={i}
                className=" border border-gray-700 rounded-2xl p-8 text-center hover:border-[#FFD24A] transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold text-[#FFD24A] mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-5 ">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 text-lg mb-12 font-normal">
            Check out our most popular games
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#1A1B1F] rounded-2xl overflow-hidden border border-gray-700 hover:border-[#FFD24A] transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={product.imageURL}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-[#FFD24A] text-black px-3 py-1 rounded-full text-xs font-medium">
                      {product.subtitle}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-2xl font-bold text-[#FFD24A] mb-4">
                      ${formatPrice(product.price)}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="block w-full text-center px-6 py-3 bg-[#FFD24A] text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Loading products...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#1A1B1F] text-white py-20 px-5 text-center border-t border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD24A]">
            Ready to Level Up?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Join thousands of gamers who trust LootBar for instant purchases.
          </p>
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-[#FFD24A] text-black rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
    