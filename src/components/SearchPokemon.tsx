"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { usePokemonDetails } from "@/src/hooks/usePokemonDetails";

export default function SearchPokemon() {
  const [search, setSearch] = useState("");
  const { refetch } = usePokemonDetails(search);

  const router = useRouter();
  const queryClient = useQueryClient();

  const handelRandom = () => {
    // Returns a random integer from 0 to 10:
    const num = Math.floor(Math.random() * 11);
    setSearch(num.toString());
  };

  const handleSearch = async () => {
    const { data, error } = await refetch();

    if (error) {
      router.push(`/error`);
    }

    // Store in cache
    queryClient.setQueryData(["pokemon", data.name], data);

    // Redirect to details page
    router.push(`/pokemon/${data.name}`);
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nameOrId"
          >
            Pokemon name or ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nameOrId"
            type="text"
            placeholder="nameOrId"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            disabled={search === ""}
            onClick={() => handleSearch()}
          >
            Search
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handelRandom()}
          >
            Random
          </button>
        </div>
      </form>
    </div>
  );
}
