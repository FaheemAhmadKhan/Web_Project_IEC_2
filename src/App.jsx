import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./component/Header/Header";
import Cards from "./component/Cards/Cards";
import Product from "./pages/Product";
import Cartlist from "./component/Cartlist/Cartlist";
import PageNotFound from "./pages/pagenotfound";
import Footer from "./component/Footer/Footer";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <div className="App bg-[#0e0e10] min-h-screen text-white flex flex-col">
        {/* Header */}
        <Header setSearch={setSearch} />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Cards search={search} />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cartlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </Router>
  );
}

export default App;
