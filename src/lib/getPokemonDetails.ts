import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonDetails = async (nameOrId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${nameOrId.toLowerCase()}`);
    return response.data;
  } catch (error) {
    throw new Error("Pokemon not found", error ? error : undefined);
  }
};
