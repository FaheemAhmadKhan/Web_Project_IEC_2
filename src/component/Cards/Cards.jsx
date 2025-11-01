import React, { useMemo } from "react";
import Mediacard from "./Mediacard/Mediacard";
import gamesData from "../../games.json";

export default function Cards({ search }) {
  const filteredGames = useMemo(() => {
    if (!search) return gamesData;

    const searchLower = search.toLowerCase();
    return gamesData.filter(
      (game) =>
        game.title?.toLowerCase().includes(searchLower) ||
        game.subtitle?.toLowerCase().includes(searchLower)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#121212] text-white py-6 px-3">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold m-0">
            {search ? `Search Results for "${search}"` : "Popular Games"}
          </h2>
          <p className="mt-2 text-gray-400">
            {filteredGames.length}{" "}
            {filteredGames.length === 1 ? "item" : "items"} available
          </p>
        </div>

        {/* Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {filteredGames.map((product) => (
              <Mediacard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-lg font-semibold mb-2">No results found</div>
            <div>Try adjusting your search terms</div>
          </div>
        )}
      </div>
    </div>
  );
}
