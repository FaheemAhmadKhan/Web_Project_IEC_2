import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Badge,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const APP_BG = "#111217";
const ACCENT = "#FFD24A";
const PILL_BG = "#1A1B1F";

export default function Header({ setSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cartList);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setSearch(value);
    if (value.trim()) navigate("/products");
  };

  return (
    <Box className="w-full">
      <AppBar
        position="static"
        className="!bg-[#111217] !shadow-sm border-b border-white/10"
      >
        <Toolbar className="min-h-[64px] flex justify-between gap-2 px-4 sm:px-6 md:px-10">

          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="no-underline text-[#FFD24A] font-extrabold tracking-tight text-lg sm:text-xl md:text-2xl flex-grow md:flex-grow-0 text-center md:text-left"
          >
            LOOTBAR.gg
          </Typography>

          {/* Search */}
          <div className="relative hidden sm:block w-full sm:w-[200px] md:w-[280px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/80 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search games…"
              value={query}
              onChange={handleSearchChange}
              className="w-full bg-white/10 hover:bg:white/20 text-white text-sm pl-10 pr-3 py-2 rounded-md outline-none transition-all duration-300"
            />
          </div>

          {/* Cart Icon */}
          <IconButton
            component={Link}
            to="/cart"
            sx={{
              color: ACCENT,
              transition: "color 200ms",
              "&:hover": { color: ACCENT },
            }}
          >
            <Badge
              badgeContent={totalQuantity}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: ACCENT,
                  color: "#111",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Language/Currency */}
          <Box className="hidden sm:inline-flex items-center bg-[#1A1B1F] border border-white/10 px-4 py-1.5 rounded-full gap-2">
            <LanguageIcon className="text-white text-[16px]" />
            <Typography variant="caption" className="text-white font-medium">
              EN
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              className="mx-1 border-white/30"
            />
            <Typography variant="caption" className="text-white font-medium">
              USD
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
