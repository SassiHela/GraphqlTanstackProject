"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemon } from "../lib/fetchPokemonRest";
import Pokemon from "./PokemonPage";
// import Image from "next/image" TextField, Button;

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const { data: pokemon, refetch, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["pokemon", search],
        queryFn: () => fetchPokemon(search),
        enabled: false, // Disable auto-fetching
    });
    const router = useRouter();
    const queryClient = useQueryClient();


    const handelRandom = () => {
        // Returns a random integer from 0 to 10:
        const num = Math.floor(Math.random() * 11);
        setSearch(num.toString());
    }

    const handleSearch = async () => {
        const { data, error } = await refetch();

        if (error) {
            alert("Pokémon not found!");
            return;
        }

        // Store in cache
        queryClient.setQueryData(["pokemon", data.name], data);

        // Redirect to details page
        router.push(`/pokemon/${data.name}`);
    };

    //
    // const {
    //     isLoading,
    //     data: { data: companies } = {},
    //     error,
    //     refetch,
    // } = useQuery({
    //     queryKey: ["companies", filter],
    //     queryFn: () => getCompanies({ filter }),
    // });




    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameOrId">
                        Pokemon name or ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nameOrId" type="text" placeholder="nameOrId"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" disabled={!search}
                        onClick={() => handleSearch()}>
                        Search
                    </button>
                    {/*<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"*/}
                    {/*   href="#">*/}
                    {/*    Forgot Password?*/}
                    {/*</a>*/}
                    <button
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={() => handelRandom()}>
                        Random
                    </button>
                </div>
            </form>

        </div>
    );
}